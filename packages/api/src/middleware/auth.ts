import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import * as passport from 'passport'
import { User } from '@larkin/api/models/User'

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      callbackURL: process.env.GITHUB_CLIENT_CALLBACK_URL as string,
    },
    async function(accessToken: any, refreshToken: any, profile: any, done: any) {
      let user = await User.query().findOne({ github_id: profile.id })
      if (!user) {
        user = await User.query().insert({
          name: profile.username,
          email: profile.emails ? profile.emails[0].value : 'github_user@example.com',
          avatar_url: profile.photos ? profile.photos[0].value : '',
          github_id: profile.id,
          github_url: profile.profileUrl,
          github_access_token: accessToken,
          github_refresh_token: refreshToken,
        })
      }
      process.nextTick(() => {
        return done(null, user)
      })
    },
  ),
)

const jwtOptions = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await User.query().findById(payload.id)
    done(null, user)
  }),
)

export const requireAuth = passport.authenticate('jwt', { session: false })

export const authMiddleware = passport.initialize()
