import { Arr, Obj, Str, Data } from "../index";

export class Auth
{
    static user(key = null, fallback = null)
    {
        let user = Data.get('auth', null);

        if ( key !== null ) {
            return Obj.get(user, key, fallback)
        }

        return user;
    }

    static guest()
    {
        return this.user('id') === null;
    }

    static can(key)
    {
        let policies = this.user('policy_modules', []);

        policies = Arr.concat(policies, [
            'liro-users-auth-login', 'liro-backend-error'
        ]);

        policies = policies.filter((policy) => {

            let regex = new RegExp('^' + Str.regexEscape(policy)
                .replace(/\\\*/g, '(.*?)') + '$');

            return key.match(regex);
        });

        return policies.length !== 0 || key === '';
    }
}

export default Auth;
