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

  // Cannot be more than 4MB
  if (image.size > 4 * 1024 * 1024) {
    return 'Image must be less than 4MB'
  }

  return null
}

/**
 * Validates project categories
 *
 * @param {Array} categories - An array of project categories
 * @returns {String|null} - Returns an error message if categories are invalid, otherwise returns null
 */
export const validateCategories = (categories) => {
  // Cannot be empty or null
  if (!categories) {
    return 'Categories cannot be empty'
  }

  // Categories must be an array
  if (!Array.isArray(categories)) {
    return 'Categories must be an array'
  }

  // Categories must contain at least one category
  if (categories.length < 1) {
    return 'Categories must contain at least one category'
  }

  // Check to see if all categories are valid
  const validCategories = projectCategories()
  for (const category of categories) {
    if (!validCategories.includes(category)) {
      return 'Categories must be valid'
    }
  }

  return null
}

/**
 * Returns an array of project categories
 *
 * @returns {Array} An array of project categories
 */
export const projectCategories = () => {
  return [
    'Chat Bot',
    'Code',
    'Content Generator',
    'Dating',
    'Design',
    'Meetings',
    'Presentation',
    'Productivity',
    'Detection',
    'Assistant',
    'Avatar',
    'Documents',
    'Youtube',
    'Writing',
    'Spreadsheet',
    'Social Media',
    'Resume'
  ]
}

/**
 * Returns an array of project categories with their corresponding text and background colors
 *
 * @returns {Array} An array of project categories with their corresponding text and background colors
 */
export const projectCategoriesWithColors = () => {
  const categories = projectCategories()

  const colors = [
    '#fee2d5',
    '#cfdfff',
    '#d0f0fd',
    '#eeeeee',
    '#d0f0fd',
    '#ffdce5',
    '#c2f5e9',
    '#d1f7c4',
    '#ffdce5',
    '#fee2d5',
    '#c2f5e9',
    '#ffeab6',
    '#d1f7c4',
    '#cfdfff',
    '#ede2fe',
    '#c2f5e9',
    '#ffdaf6'
  ]

  const result = categories.map((category, index) => {
    const color = colors[index % colors.length]
    const textColor = getContrastColor(color)

    return {
      name: category,
      textColor: textColor,
      backgroundColor: color
    }
  })

  return result
}

/**
 * Returns a contrasting text color based on the given background color
 *
 * @param {String} backgroundColor - The background color to calculate the contrasting text color for
 * @returns {String} The contrasting text color
 */
function getContrastColor(backgroundColor) {
  // Return a contrasting text color based on the given background color
  // https://stackoverflow.com/a/3943023/114157
  if (backgroundColor === '#ff0000') {
    return '#ff0000'
  }

  const rgb = parseInt(backgroundColor.substring(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luma < 128 ? '#fff' : '#000'
}
