import { isNotNull, isNumber, isString } from "../guards/base-guards"
import { BrandedType } from "../types/base-types"
import { getCountryNameByPrefix, getPrefixFromNumber } from "../utilities/telephone-utils"

type TelephoneType = BrandedType<string, 'TelephoneNumber'>
type TelephoneProps = { number: string | number, prefix?: number }

class Telephone {
    telephone!: TelephoneType
    prefixedNumber!: string
    prefix!: number
    countryName!: string

    constructor({ number, ...props }: TelephoneProps) {

        if (!Telephone.isValid(number)) {
            throw new Error(`Invalid telephone number provided: ${number}`)
        }

        this.initializeProps({ number, ...props })
    }

    private initializeProps(props: TelephoneProps): void {
        const parsedNumber = `${props.number}`

        // If we do not have any reference to the prefix (it will be set to 0) we will need to figure out how to know the prefix based on the 
        // phone format. This could be expensive if we need to request data online (no-go)
        this.prefix = props.prefix ? props.prefix : getPrefixFromNumber(parsedNumber) || 0

        this.prefixedNumber = `+${this.prefix} ${this.telephone}`

        this.countryName = getCountryNameByPrefix(`${this.prefix}`) || 'Unknown'
    }

    static isValid(number: unknown): number is TelephoneType {
        return isNotNull(number) && isString(number) || isNumber(number)
    }

}

export default Telephone