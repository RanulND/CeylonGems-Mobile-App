export function nameValidator(name) {
  if (!name) return "Name can't be empty."
  return ''
}

export function nicValidator(nic) {
  if (!nic) return "Password can't be empty."
  if (nic.length < 10) return 'NIC must be at least 10 characters long.'
  if (nic.length > 12) return 'NIC can be only 12 characters long.'
  return ''
}


export function phoneValidator(phone) {
  const re = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
  if (!phone) return "Phone Number can't be empty."
  if (!re.test(phone)) return 'Ooops! We need a valid phone number.'
  return ''
}
