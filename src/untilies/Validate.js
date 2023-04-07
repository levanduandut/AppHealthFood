export const isValidateEmail = (stringEmail) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
export const isValidatePassword = (stringPassword) => stringPassword.length >=4