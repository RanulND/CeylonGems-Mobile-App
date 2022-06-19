
export function passwordValidator(password) {
  const re = /^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/
  if (!password) return "Password can't be empty."
  if (!re.test(password)) return 'password must contain at least eight characters, at least one number and one special character, both lower and uppercase letters'
  return ''
}


