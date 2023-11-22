export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/api/oauth2/redirect'
// export const OAUTH2_REDIRECT_URI = 'https://www.itforum.site/api/oauth2/redirect'

//oauth 2 redirect
export const GOOGLE_AUTH_URL =
  process.env.API_URL +
  '/oauth2/authorize/google?redirect_uri=' +
  OAUTH2_REDIRECT_URI
export const FACEBOOK_AUTH_URL =
  process.env.API_URL +
  '/oauth2/authorize/facebook?redirect_uri=' +
  OAUTH2_REDIRECT_URI
export const GITHUB_AUTH_URL =
  process.env.API_URL +
  '/oauth2/authorize/github?redirect_uri=' +
  OAUTH2_REDIRECT_URI

//post filter in home page
export const SORT_POST_HOT    = 'hot'
export const SORT_POST_NEW    = 'created_desc'

//search sort
export const USER_SEARCH_SORT = 'account'
export const POST_SEARCH_SORT = 'post'
export const TAG_SEARCH_SORT  = 'tag'
