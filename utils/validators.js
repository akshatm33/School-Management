const validateSchoolData = (data) => {
  // Check name field
  if (!data.name) {
    return {
      isValid: false,
      error: 'School name is required',
      field: 'name',
    };
  }

  if (typeof data.name !== 'string') {
    return {
      isValid: false,
      error: 'School name must be text',
      field: 'name',
    };
  }

  if (data.name.trim() === '') {
    return {
      isValid: false,
      error: 'School name cannot be empty',
      field: 'name',
    };
  }

  if (data.name.length > 255) {
    return {
      isValid: false,
      error: 'School name cannot exceed 255 characters',
      field: 'name',
    };
  }

  // Check address field
  if (!data.address) {
    return {
      isValid: false,
      error: 'School address is required',
      field: 'address',
    };
  }

  if (typeof data.address !== 'string') {
    return {
      isValid: false,
      error: 'School address must be text',
      field: 'address',
    };
  }

  if (data.address.trim() === '') {
    return {
      isValid: false,
      error: 'School address cannot be empty',
      field: 'address',
    };
  }

  if (data.address.length > 500) {
    return {
      isValid: false,
      error: 'School address cannot exceed 500 characters',
      field: 'address',
    };
  }

  // Check latitude field
  if (data.latitude === undefined || data.latitude === null || data.latitude === '') {
    return {
      isValid: false,
      error: 'Latitude is required',
      field: 'latitude',
    };
  }

  const latitude = parseFloat(data.latitude);
  if (isNaN(latitude)) {
    return {
      isValid: false,
      error: 'Latitude must be a valid number',
      field: 'latitude',
    };
  }

  if (latitude < -90 || latitude > 90) {
    return {
      isValid: false,
      error: 'Latitude must be between -90 and 90',
      field: 'latitude',
    };
  }

  // Check longitude field
  if (data.longitude === undefined || data.longitude === null || data.longitude === '') {
    return {
      isValid: false,
      error: 'Longitude is required',
      field: 'longitude',
    };
  }

  const longitude = parseFloat(data.longitude);
  if (isNaN(longitude)) {
    return {
      isValid: false,
      error: 'Longitude must be a valid number',
      field: 'longitude',
    };
  }

  if (longitude < -180 || longitude > 180) {
    return {
      isValid: false,
      error: 'Longitude must be between -180 and 180',
      field: 'longitude',
    };
  }

  return {
    isValid: true,
    error: null,
    field: null,
  };
};

const validateStudentData = (data) => {
  // Check name field
  if (!data.name) {
    return {
      isValid: false,
      error: 'Student name is required',
      field: 'name',
    };
  }

  if (typeof data.name !== 'string' || data.name.trim() === '') {
    return {
      isValid: false,
      error: 'Student name must be valid text',
      field: 'name',
    };
  }

  // Check email field
  if (!data.email) {
    return {
      isValid: false,
      error: 'Student email is required',
      field: 'email',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      isValid: false,
      error: 'Student email is invalid',
      field: 'email',
    };
  }

  // Check age field (optional but validate if provided)
  if (data.age !== undefined && data.age !== null && data.age !== '') {
    const age = parseInt(data.age);
    if (isNaN(age) || age < 0 || age > 120) {
      return {
        isValid: false,
        error: 'Student age must be between 0 and 120',
        field: 'age',
      };
    }
  }

  return {
    isValid: true,
    error: null,
    field: null,
  };
};

const validateId = (id) => {
  if (!id) {
    return {
      isValid: false,
      error: 'ID is required',
    };
  }

  const numId = parseInt(id);
  if (isNaN(numId)) {
    return {
      isValid: false,
      error: 'ID must be a valid number',
    };
  }

  if (numId <= 0) {
    return {
      isValid: false,
      error: 'ID must be greater than 0',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

module.exports = {
  validateSchoolData,
  validateStudentData,
  validateId,
};
