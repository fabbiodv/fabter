import { useEffect, useState } from 'react'
import Head from 'next/head'
import AppLayout from 'components/AppLayout'
import { colors } from 'styles/theme'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import Logo from 'components/Icons/Logo'
import { loginWithGitHub, onAuthStateChanged } from '../firebase/client'
import Avatar from 'components/Avatar/Index'

export default function Home () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub().then(user => {
      const { avatar, username, url } = user
      setUser(user)
      console.log(user)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <Logo width='100'/>
          <h1>Fabter</h1>
          <h2>Talk about development<br />with developers 👩‍💻👨‍💻</h2>

          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  alt={user.username}
                  src={user.avatar}
                  text={user.username}
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
