import React, { useState, useEffect, useContext } from 'react'
import Feed from '../components/feed'

import Nav from './../components/nav'
import Search from './../components/search'
import Fweeter from '../components/fweeter'
import { faunaQueries } from '../fauna/query-manager'
import { safeVerifyError } from '../fauna/helpers/errors'
import { toast } from 'react-toastify'
import SessionContext from '../context/session'

const Home = () => {
  const [state, setState] = useState({
    fweets: [],
    loaded: false,
    error: false
  })

  // Fetch the fweets on first load.
  const sessionContext = useContext(SessionContext)
  const { user } = sessionContext.state

  useEffect(() => {
    if (user) {
      faunaQueries
        .getFweets()
        .then(result => {
          setState({
            fweets: result,
            loaded: true
          })
        })
        .catch(err => {
          console.log(err)
          const rawError = safeVerifyError(err, ['requestResult', 'responseRaw'])
          if (rawError && rawError.includes('Rate limiting')) {
            setState({ error: { message: 'Rate-limiting' }, fweets: [], loaded: true })
            toast.warn('You are reloading too fast')
          } else if (rawError && rawError.includes('permission denied')) {
            setState({ error: { message: 'Permission denied!' }, fweets: [], loaded: true })
            toast.error('No data permissions')
          } else {
            setState({ error: err, fweets: [], loaded: true })
            toast.error('Unknown error')
          }
        })
    }
  }, [user])

  const handleCreateFweet = (message, asset) => {
    return faunaQueries
      .createFweet(message, asset)
      .then(fweetArray => {
        setState({
          fweets: fweetArray.concat(state.fweets),
          loaded: true
        })
        toast.success('Published!')
      })
      .catch(err => {
        const rawError = safeVerifyError(err, ['requestResult', 'responseRaw'])
        if (rawError.includes('Rate limiting')) {
          toast.warn('You are posting too fast')
        } else {
          console.error('error on Post', err)
          toast.error('Post failed')
        }
      })
  }

  const update = (fweets, loaded, error) => {
    setState({
      fweets: fweets,
      loaded: loaded,
      error: error
    })
  }

  return (
    <React.Fragment>
      <Nav />
      <div className="main-column">
        {user ? <Fweeter handleCreateFweet={handleCreateFweet}></Fweeter> : null}
        <Feed update={update} error={state.error} loaded={state.loaded} fweets={state.fweets} />
      </div>    <>
      <div className="div">
        <a href="https://shop.unlimitpotential.com/" className="a">
          <div className="div-2">
            <picture>
              <source
                srcset="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcset="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer" />
          </div>
          <div className="div-3">
            <p>Create an Online Store</p>
          </div>
        </a>
        <a href="https://unlimitednow.me" className="a-2">
          <div className="div-4">
            <picture>
              <source
                srcset="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcset="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer" />
          </div>
          <div className="div-5">
            <p>Create an Ad for Social Media</p>
          </div>
        </a>
        <a href="https://my.unlimitednow.site/launch" className="a-3">
          <div className="div-6">
            <picture>
              <source
                srcset="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcset="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer" />
          </div>
          <div className="div-7">
            <p>Customize Your Site</p>
          </div>
        </a>
      </div>
      <style jsx>{`
        .div {
          position: relative;
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .div {
            width: auto;
            align-self: center;
          }
        }
        .a {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 020px;
          margin-bottom: 20px;
          cursor: pointer;
          pointer-events: auto;
        }
        .div-2 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .image {
          object-fit: cover;
          object-position: center;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
        }
        .image-sizer {
          width: 100%;
          padding-top: 56.3%;
          pointer-events: none;
          font-size: 0;
        }
        .div-3 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          margin-bottom: 50px;
        }
        .a-2 {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          pointer-events: auto;
        }
        .div-4 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .div-5 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          margin-bottom: 50px;
        }
        .a-3 {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          pointer-events: auto;
        }
        .div-6 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .div-7 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          margin-bottom: 50px;
        }
      `}</style>
    </>
      {user ? <Search /> : null}
    </React.Fragment>
  )
}

export default Home
