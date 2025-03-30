export const buildWorkspaceRoute = (workspaceId: string, path: string) => {
  // If path starts with '/', remove it to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path

  // If path is just '#', return the workspace root
  if (path === '#') {
    return `/workspace/${workspaceId}`
  }

  return `/workspace/${workspaceId}/${cleanPath}`
}
