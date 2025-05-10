-- Create transactions table for money-manager app
CREATE TABLE IF NOT EXISTS currencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    symbol VARCHAR(10) NOT NULL
)

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(20) NOT NULL CHECK (type IN ('expenses', 'income', 'investment', 'subscription', 'transfer')),
  name VARCHAR(255) NOT NULL,
  account_id UUID REFERENCES accounts(id),
  amount DECIMAL(15, 2) NOT NULL,
  currency_id INTEGER REFERENCES currencies(id),
  category_id INTEGER REFERENCES categories(id),
  transaction_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  is_credited BOOLEAN DEFAULT FALSE,
  is_debited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  -- Add constraints for transaction types
--   CONSTRAINT type_expenses_check CHECK (
--     (type != 'expenses') OR 
--     (account_id IS NOT NULL AND category_id IS NOT NULL)
--   ),
--   CONSTRAINT type_income_check CHECK (
--     (type != 'income') OR 
--     (account_id IS NOT NULL)
--   ),
--   CONSTRAINT type_investment_check CHECK (
--     (type != 'investment') OR 
--     (account_id IS NOT NULL)
--   ),
--   CONSTRAINT type_subscription_check CHECK (
--     (type != 'subscription') OR 
--     (account_id IS NOT NULL AND category_id IS NOT NULL)
--   ),
--   CONSTRAINT type_transfer_check CHECK (
--     (type != 'transfer') OR 
--     (from_account_id IS NOT NULL AND to_account_id IS NOT NULL)
--   )
);

-- Create trigger to update the updated_at field
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_transactions_updated_at
BEFORE UPDATE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_from_account_id ON transactions(from_account_id);
CREATE INDEX idx_transactions_to_account_id ON transactions(to_account_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_datetime ON transactions(datetime);
CREATE INDEX idx_transactions_type ON transactions(type);

-- Grant permissions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to only see their own transactions
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own transactions
CREATE POLICY "Users can insert their own transactions"
  ON transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own transactions
CREATE POLICY "Users can update their own transactions"
  ON transactions FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy to allow users to delete their own transactions
CREATE POLICY "Users can delete their own transactions"
  ON transactions FOR DELETE
  USING (auth.uid() = user_id);

-- Create functions to handle account balance updates
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
DECLARE
  current_datetime TIMESTAMP WITH TIME ZONE := now();
BEGIN
  -- For new transactions
  IF (TG_OP = 'INSERT') THEN
    -- Handle regular transactions (expenses, income, investment, subscription)
    IF NEW.type = 'expenses' OR NEW.type = 'subscription' THEN
      -- Decrease balance for expenses and subscriptions
      UPDATE accounts 
      SET 
        balance = balance - NEW.amount,
        lastTransactionDate = current_datetime,
        updated_at = current_datetime
      WHERE id = NEW.account_id;
    ELSIF NEW.type = 'income' OR NEW.type = 'investment' THEN
      -- Increase balance for income and investments
      UPDATE accounts 
      SET 
        balance = balance + NEW.amount,
        lastTransactionDate = current_datetime,
        updated_at = current_datetime
      WHERE id = NEW.account_id;
    ELSIF NEW.type = 'transfer' THEN
      -- For transfers, decrease from source account and increase in destination account
      UPDATE accounts 
      SET 
        balance = balance - NEW.amount,
        lastTransactionDate = current_datetime,
        updated_at = current_datetime
      WHERE id = NEW.from_account_id;
      
      UPDATE accounts 
      SET 
        balance = balance + NEW.amount,
        lastTransactionDate = current_datetime,
        updated_at = current_datetime
      WHERE id = NEW.to_account_id;
    END IF;
    
  -- For updated transactions
  ELSIF (TG_OP = 'UPDATE') THEN
    -- If transaction type changed, we may need to handle differently
    IF OLD.type != NEW.type OR 
       OLD.amount != NEW.amount OR 
       OLD.account_id != NEW.account_id OR
       OLD.from_account_id != NEW.from_account_id OR
       OLD.to_account_id != NEW.to_account_id THEN
      
      -- First, revert the old transaction's effect
      IF OLD.type = 'expenses' OR OLD.type = 'subscription' THEN
        -- Add back the amount that was originally subtracted
        UPDATE accounts 
        SET 
          balance = balance + OLD.amount,
          updated_at = current_datetime
        WHERE id = OLD.account_id;
      ELSIF OLD.type = 'income' OR OLD.type = 'investment' THEN
        -- Subtract the amount that was originally added
        UPDATE accounts 
        SET 
          balance = balance - OLD.amount,
          updated_at = current_datetime
        WHERE id = OLD.account_id;
      ELSIF OLD.type = 'transfer' THEN
        -- Revert transfer
        UPDATE accounts 
        SET 
          balance = balance + OLD.amount,
          updated_at = current_datetime
        WHERE id = OLD.from_account_id;
        
        UPDATE accounts 
        SET 
          balance = balance - OLD.amount,
          updated_at = current_datetime
        WHERE id = OLD.to_account_id;
      END IF;
      
      -- Then apply the new transaction's effect
      IF NEW.type = 'expenses' OR NEW.type = 'subscription' THEN
        UPDATE accounts 
        SET 
          balance = balance - NEW.amount,
          lastTransactionDate = current_datetime,
          updated_at = current_datetime
        WHERE id = NEW.account_id;
      ELSIF NEW.type = 'income' OR NEW.type = 'investment' THEN
        UPDATE accounts 
        SET 
          balance = balance + NEW.amount,
          lastTransactionDate = current_datetime,
          updated_at = current_datetime
        WHERE id = NEW.account_id;
      ELSIF NEW.type = 'transfer' THEN
        UPDATE accounts 
        SET 
          balance = balance - NEW.amount,
          lastTransactionDate = current_datetime,
          updated_at = current_datetime
        WHERE id = NEW.from_account_id;
        
        UPDATE accounts 
        SET 
          balance = balance + NEW.amount,
          lastTransactionDate = current_datetime,
          updated_at = current_datetime
        WHERE id = NEW.to_account_id;
      END IF;
    END IF;
  
  -- For deleted transactions
  ELSIF (TG_OP = 'DELETE') THEN
    -- Revert the transaction's effect
    IF OLD.type = 'expenses' OR OLD.type = 'subscription' THEN
      -- Add back the amount that was originally subtracted
      UPDATE accounts 
      SET 
        balance = balance + OLD.amount,
        updated_at = current_datetime
      WHERE id = OLD.account_id;
    ELSIF OLD.type = 'income' OR OLD.type = 'investment' THEN
      -- Subtract the amount that was originally added
      UPDATE accounts 
      SET 
        balance = balance - OLD.amount,
        updated_at = current_datetime
      WHERE id = OLD.account_id;
    ELSIF OLD.type = 'transfer' THEN
      -- Revert transfer
      UPDATE accounts 
      SET 
        balance = balance + OLD.amount,
        updated_at = current_datetime
      WHERE id = OLD.from_account_id;
      
      UPDATE accounts 
      SET 
        balance = balance - OLD.amount,
        updated_at = current_datetime
      WHERE id = OLD.to_account_id;
    END IF;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update account balances
CREATE TRIGGER update_account_balance_on_transaction
AFTER INSERT OR UPDATE OR DELETE ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_account_balance();