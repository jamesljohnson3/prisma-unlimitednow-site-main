import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import SessionContext from '../context/session'
import Card from '../components/card'
import { safeVerifyError } from '../fauna/helpers/errors'
import { faunaQueries } from '../fauna/query-manager'

const Feed = props => {
  const sessionContext = useContext(SessionContext)
  const { user } = sessionContext.state

  const generateFweetsOrUserFeedback = (fweets, error, loaded, user) => {
    // Unexpected error
    if (error) {
      return generateUserError(error)
    }
    // We are not logged in yet
    else if (!user) {
      return generateNotLoggedIn(fweets)
    } else if (!loaded) {
      return generateLoading()
    }
    // We received an empty list of profiles (e.g. they are all private or our filtering is too aggressive)
    else if (fweets && fweets.length === 0) {
      return generateNotFound()
    }
    // Or we just received profiles
    else {
      return generateFweets(fweets)
    }
  }

  const generateLoading = () => {
    return (
      <div className="no-results-container">
        <p className="no-results-text"></p> <>
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
        <img className="no-results-image" src="/images/dino-loading.gif" alt="no results" />
        <p className="no-results-subtext">Loading... ...</p>
      </div>
    )
  }

  const generateUserError = error => {
    console.log('User Error', error)
    return (
      <div className="no-results-container">
        <p className="no-results-text">400</p>
        <img className="no-results-image" src="/images/dino-error.png" alt="no results" />
        <p className="no-results-subtext">{error.message}</p>
      </div>
    )
  }
  
  const generateNotLoggedIn = () => {
    return (
      <div className="no-results-container"><div class="BeOpWidget" data-content="629f1004c1a23d17afd1584e"></div>





      </div>
    )
  }

  const generateNotFound = () => {
    return (
      <div className="no-results-container">
        <p className="no-results-text">No ads found</p>
        <img className="no-results-image" src="/images/dino-noresults.png" alt="no results" />
        <p className="no-results-subtext">Be the first to create one</p>
        </div>
    )
  }

  const generateFweets = fweetsAndMore => {
    return fweetsAndMore.map((fweetAndMore, index) => {
      return (
        <Card
          key={'fweet_' + fweetAndMore.fweet.ref.toString()}
          fweetAndMore={fweetAndMore}
          handleLike={handleLike}
          handleRefweet={handleRefweet}
          handleComment={handleComment}
        ></Card>
      )
    })
  }

  const handleLike = fweetAndUser => {
    // we only need to pass the user, the liker can be identified with the FaunaDB CurrentIdentity() function.
    // Trying to make any other user like a fweet should be blocked via security rules.
    // In this application we will use an ABAC rule to do that. You could also opt to
    // group this logic in a UDF function to make sure that the user can't do anything else.
    faunaQueries
      .likeFweet(fweetAndUser.fweet.ref)
      .then(res => {
        if (res.length > 0) {
          // immutably changing fweets
          const newFweet = res[0]
          props.update(
            props.fweets.map(el => (el.fweet.ref === fweetAndUser.fweet.ref ? newFweet : el)),
            true
          )
        } else {
          toast.error('Something went wrong')
        }
      })
      .catch(err => {
        console.error(err)
        toast.error('Something went wrong')
      })
  }

  const handleRefweet = (fweetAndUser, message) => {
    faunaQueries
      .refweet(fweetAndUser.fweet.ref, message)
      .then(refweetAndOriginalUpdated => {
        const newFweets = [refweetAndOriginalUpdated.refweet].concat(props.fweets)
        const originalIndex = newFweets.findIndex(el => el.fweet.ref.toString() === fweetAndUser.fweet.ref.toString())
        newFweets[originalIndex] = refweetAndOriginalUpdated.original

        props.update(newFweets, true)
        toast.success('Published!')
      })
      .catch(err => {
        // Since Refweet is handled by the function, both the function call
        // as the content of the function can result in an error, therefore the error
        // is tucked away a bit more than usual.
        const functionErrorDescription = safeVerifyError(err, [
          'requestResult',
          'responseContent',
          'errors', // The errors of the call
          0,
          'cause', // the underlying cause (the error in the function)
          0,
          'description'
        ])
        if (functionErrorDescription === 'already Boosted') {
          toast.error('Already Sent!')
        } else {
          toast.error('Boost failed')
        }
      })
  }

  const handleComment = (fweetAndUser, message) => {
    faunaQueries
      .comment(fweetAndUser.fweet.ref, message)
      .then(fweetUpdated => {
        console.log('comment res', fweetUpdated)
        const fweetUpdatedIndex = props.fweets.findIndex(
          el => el.fweet.ref.toString() === fweetAndUser.fweet.ref.toString()
        )
        const newFweets = props.fweets.slice()
        newFweets[fweetUpdatedIndex] = fweetUpdated
        props.update(newFweets, true)
        toast.success('Published!')
      })
      .catch(err => {
        console.error('error on Comment', err)
        toast.error('Comment failed')
      })
  }

  // Return the header and either show an error or render the loaded fweets.
  return (
    <main className="body-content">
      <div className="fweets">{generateFweetsOrUserFeedback(props.fweets, props.error, props.loaded, user)}</div>
    </main>
  )
}

Feed.propTypes = {
  title: PropTypes.string,
  fweets: PropTypes.array,
  error: PropTypes.any,
  loaded: PropTypes.bool,
  update: PropTypes.func
}

export default Feed
