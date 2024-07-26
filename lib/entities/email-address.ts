import { BrandedType } from "../types/base-types"
import { isNotNull, isString } from "../guards/base-guards"

type EmailAddressType = BrandedType<string, 'EmailAddress'>


class EmailAddress {
    email: EmailAddressType

    constructor(email: string) {

        if (!EmailAddress.isValid(email)) {
            throw new Error(`Invalid email provided: ${email}`)
        }

        this.email = email
    }

    get(selector: 'email' | 'host') {
        const [email, host] = this.email.split('@')

        return { email, host }[selector]
    }

    toString(): string {
        return `${this.email}`
    }

    static isValid(email: unknown): email is EmailAddressType {
        return isNotNull(email) && isString(email) && email.split('@').length > 1
    }

    static isEmailAddressInstance(email: unknown): email is EmailAddress {
        return isNotNull(email) && email instanceof EmailAddress
    }
}

export default EmailAddress