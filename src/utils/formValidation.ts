
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateCACForm = (data: any, step: number): ValidationResult => {
  const errors: string[] = [];

  switch (step) {
    case 1: // Company Information
      if (!data.companyName?.trim()) errors.push('Company name is required');
      if (!data.businessType) errors.push('Business type is required');
      
      if (data.businessType === 'Private Limited Company (LTD)') {
        if (!data.shareCapital) errors.push('Share capital is required for LTD');
        if (!data.numberOfShares) errors.push('Number of shares is required for LTD');
        if (!data.parValue) errors.push('Par value is required for LTD');
      }
      break;

    case 2: // Business Details
      if (!data.businessAddress?.trim()) errors.push('Business address is required');
      if (!data.city?.trim()) errors.push('City is required');
      if (!data.state) errors.push('State is required');
      if (!data.businessDescription?.trim()) errors.push('Business description is required');
      if (!data.principalBusinessActivity) errors.push('Principal business activity is required');
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateDirectorsForm = (directors: any[]): ValidationResult => {
  const errors: string[] = [];

  if (directors.length === 0) {
    errors.push('At least one director is required');
    return { isValid: false, errors };
  }

  directors.forEach((director, index) => {
    if (!director.firstName?.trim()) errors.push(`Director ${index + 1}: First name is required`);
    if (!director.lastName?.trim()) errors.push(`Director ${index + 1}: Last name is required`);
    if (!director.email?.trim()) errors.push(`Director ${index + 1}: Email is required`);
    if (!director.phone?.trim()) errors.push(`Director ${index + 1}: Phone is required`);
    if (!director.address?.trim()) errors.push(`Director ${index + 1}: Address is required`);
    if (!director.nationality) errors.push(`Director ${index + 1}: Nationality is required`);
    if (!director.occupation?.trim()) errors.push(`Director ${index + 1}: Occupation is required`);
    if (!director.dateOfBirth) errors.push(`Director ${index + 1}: Date of birth is required`);
    if (!director.shareholding?.trim()) errors.push(`Director ${index + 1}: Shareholding is required`);
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateDocumentsForm = (documents: any[]): ValidationResult => {
  const errors: string[] = [];
  const requiredDocuments = documents.filter(doc => doc.required);
  const uploadedRequiredDocuments = requiredDocuments.filter(doc => doc.uploaded);

  if (uploadedRequiredDocuments.length < requiredDocuments.length) {
    errors.push('All required documents must be uploaded');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
