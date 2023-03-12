/**
 * Validates email
 *
 * @param {String} email
 * @returns {Boolean}
 */
export const validateEmail = (email) => {
  // Cannot be empty or null
  if (!email) {
    return false;
  }

  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

/**
 * Validate Password
 *
 * @param {String} password
 * @returns {Boolean}
 */
export const validatePassword = (password) => {
  // Cannot be less than 6 characters
  // Note: If you change this, you must also change validation on supabase
  if (password.length < 6) {
    return false;
  }

  // Cannot be empty or null
  if (!password) {
    return false;
  }

  return true;
}

/**
 * Validate Title
 *
 * @param {String} title
 * @returns {String|null}
 */
export const validateTitle = (title) => {
  // Cannot be empty or null
  if (!title) {
    return 'Title cannot be empty'
  }

  // Cannot be less than 3 characters or more than 255 characters
  if (title.length < 3 || title.length > 255) {
    return 'Title must be between 3 and 255 characters'
  }

  return null
}

/**
 * Validate Description
 *
 * @param {String} description
 * @returns {String|null}
 */
export const validateDescription = (description) => {
  // Cannot be empty or null
  if (!description) {
    return 'Description cannot be empty'
  }

  // Cannot be less than 3 characters or more than 400 characters
  if (description.length < 3 || description.length > 400) {
    return 'Description must be between 3 and 400 characters'
  }

  return null
}

/**
 * Validate Website URL
 *
 * @param {String} url
 * @returns {String|null}
 */
export const validateWebsiteUrl = (url) => {
  // Cannot be empty or null
  if (!url) {
    return 'URL cannot be empty'
  }

  // Cannot be less than 3 characters or more than 255 characters
  if (url.length < 3 || url.length > 255) {
    return 'URL must be between 3 and 255 characters'
  }

  // Must be a valid URL
  const re = /^(ftp|http|https):\/\/[^ "]+$/
  return re.test(url) ? null : 'URL must be valid'
}

/**
 * Validate Image
 *
 * @param {File} image
 * @returns
 */
export const validateImage = (image) => {
  // Cannot be empty or null
  if (!image) {
    return 'Image cannot be empty'
  }

  return null
}
