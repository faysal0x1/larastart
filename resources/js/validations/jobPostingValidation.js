export const validateStep = (step, formData, errors, setErrors, {
    countries,
    microTaskCategories,
    thumbnails,
    mediaLinks,
    files,
    proofRequirements
}) => {
    const newErrors = { ...errors };
    let isValid = true;

    if (step === 1) {
        // Job Title validation
        if (!formData.jobTitle.trim()) {
            newErrors.jobTitle = 'Job title is required';
            isValid = false;
        } else {
            newErrors.jobTitle = '';
        }

        // Job Description validation
        if (!formData.jobDescription.trim()) {
            newErrors.jobDescription = 'Job description is required';
            isValid = false;
        } else if (formData.jobDescription.trim().length < 20) {
            newErrors.jobDescription = 'Description must be at least 20 characters';
            isValid = false;
        } else {
            newErrors.jobDescription = '';
        }

        // Budget validation
        if (!formData.budget) {
            newErrors.budget = 'Budget is required';
            isValid = false;
        } else if (isNaN(formData.budget)) {
            newErrors.budget = 'Budget must be a number';
            isValid = false;
        } else if (parseFloat(formData.budget) <= 0) {
            newErrors.budget = 'Budget must be greater than 0';
            isValid = false;
        } else {
            newErrors.budget = '';
        }

        // Deadline validation
        if (!formData.deadline) {
            newErrors.deadline = 'Deadline is required';
            isValid = false;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const deadlineDate = new Date(formData.deadline);
            if (deadlineDate < today) {
                newErrors.deadline = 'Deadline must be in the future';
                isValid = false;
            } else {
                newErrors.deadline = '';
            }
        }

        // Country validation
        if (!formData.country) {
            newErrors.country = 'Country is required';
            isValid = false;
        } else {
            newErrors.country = '';
        }

        // Job Category validation
        if (!formData.jobCategory) {
            newErrors.jobCategory = 'Job category is required';
            isValid = false;
        } else {
            newErrors.jobCategory = '';
        }

        // External Link validation
        if (!formData.externalLink) {
            newErrors.externalLink = 'Task URL is required';
            isValid = false;
        } else {
            try {
                new URL(formData.externalLink);
                newErrors.externalLink = '';
            } catch (e) {
                newErrors.externalLink = 'Please enter a valid URL';
                isValid = false;
            }
        }

        // Points validation
        if (!formData.pointsPerCompletion) {
            newErrors.pointsPerCompletion = 'Points per completion is required';
            isValid = false;
        } else if (isNaN(formData.pointsPerCompletion)) {
            newErrors.pointsPerCompletion = 'Points must be a number';
            isValid = false;
        } else if (parseInt(formData.pointsPerCompletion) <= 0) {
            newErrors.pointsPerCompletion = 'Points must be greater than 0';
            isValid = false;
        } else {
            newErrors.pointsPerCompletion = '';
        }
    }

    if (step === 2) {
        // Thumbnails validation
        if (thumbnails.length === 0) {
            newErrors.thumbnails = 'At least one thumbnail is required';
            isValid = false;
        } else {
            newErrors.thumbnails = '';
        }

        // Media validation
        if (mediaLinks.length === 0 && files.length === 0) {
            newErrors.media = 'At least one media link or instruction file is required';
            isValid = false;
        } else {
            newErrors.media = '';
        }

        // Media links validation
        if (mediaLinks.length > 0) {
            const invalidLinks = mediaLinks.filter((link) => {
                try {
                    new URL(link);
                    return false;
                } catch (e) {
                    return true;
                }
            });

            if (invalidLinks.length > 0) {
                newErrors.mediaLinks = 'One or more media links are invalid';
                isValid = false;
            } else {
                newErrors.mediaLinks = '';
            }
        }
    }

    if (step === 3) {
        // Completion instructions validation
        if (!formData.completionInstructions.trim()) {
            newErrors.completionInstructions = 'Completion instructions are required';
            isValid = false;
        } else if (formData.completionInstructions.trim().length < 20) {
            newErrors.completionInstructions = 'Instructions must be at least 20 characters';
            isValid = false;
        } else {
            newErrors.completionInstructions = '';
        }

        // Proof requirements validation
        if (proofRequirements.length === 0) {
            newErrors.proofRequirements = 'At least one proof requirement is required';
            isValid = false;
        } else {
            newErrors.proofRequirements = '';
        }
    }

    setErrors(newErrors);
    return isValid;
};

// You can also add helper validation functions here if needed
export const validateField = (fieldName, value) => {
    const fieldValidations = {
        jobTitle: (val) => val.trim().length > 0,
        jobDescription: (val) => val.trim().length >= 20,
        budget: (val) => !isNaN(val) && parseFloat(val) > 0,
        // Add more field validations as needed
    };

    return fieldValidations[fieldName] ? fieldValidations[fieldName](value) : true;
};