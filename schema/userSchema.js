

export const userSchema = {
  type: 'object',
  properties: {
    login: { type: 'string' },
    id: { type: 'number' },
    type: { type: 'string' },
    site_admin: { type: 'boolean' },
    public_repos: { type: 'number' },
    followers: { type: 'number' },
    following: { type: 'number' },
    html_url: { type: 'string' }
  },
  required: [
    'login',
    'id',
    'type',
    'site_admin',
    'public_repos',
    'followers',
    'following',
    'html_url'
  ]
};