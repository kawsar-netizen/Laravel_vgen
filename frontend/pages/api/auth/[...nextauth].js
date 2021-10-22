import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
    providers: [
        Providers.GitHub({
            clientId: 'e38deccb8ddb441be6e3',
            clientSecret: '83b10a7f9cac786046702c0de9e05bd56d714dfe',
        })
    ]
}

export default (req, res) => NextAuth(req, res, options)