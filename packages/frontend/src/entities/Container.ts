export interface Container {
  id: string
  status: string
  image: string
  command?: string
  public_host: string
  created_at: string
}
