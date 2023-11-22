// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'
import Cookies from 'cookies'

type Data = {
  message: string
}
export const config = {
  api: {
    bodyParser: false,
  },
}
const proxy = httpProxy.createProxyServer()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'GET') {
    return res.status(404).json({ message: 'method not supported' })
  }
  let token: any = req.query.token
  const d = new Date(Date.now())
  const cookies = new Cookies(req, res, {
    secure: process.env.NODE_ENV !== 'development',
  })
  console.log("path: ",)
  cookies.set('access_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(d.valueOf() + 1000 * 60 * 60 * 24 * 7), //Long type
  })
  res.redirect(cookies.get('path-to-back') || '/')
}
