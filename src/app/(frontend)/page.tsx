import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import { LogoutButton } from "./components/LogoutButton"

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://webflow-amber-prod.gumlet.io/620e4101b2ce125835bff0bb/amberCMS_logo_white.webp" />
          <Image
            alt="AmberCMS Logo"
            height={250}
            src="https://webflow-amber-prod.gumlet.io/620e4101b2ce125835bff0bb/amberCMS_logo_white.webp"
            width={250}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          {user && (
            <LogoutButton />
        )}
        </div>
      </div>
     
    </div>
  )
}
