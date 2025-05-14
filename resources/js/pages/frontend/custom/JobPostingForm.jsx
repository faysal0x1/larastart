import EmployeeDashboardLayout from '@/layouts/employeeDashboardLayout/EmployeeDashboardLayout.jsx';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import GlobalLoader from '../../../components/frontend/GlobalLoader';

function JobPostingForm() {
    const { countries, microTaskCategories } = usePage().props;
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        budget: '',
        deadline: '',
        country: '', // stores country ID
        countryName: '', // stores country name for display
        jobCategory: '',
        jobLinks: [],
        maxCompletions: '',
        points: '',
        externalLink: '',
        completionInstructions: '',
    });
    const [errors, setErrors] = useState({
        jobTitle: '',
        jobDescription: '',
        budget: '',
        deadline: '',
        country: '',
        jobCategory: '',
    });

    const [mediaLinks, setMediaLinks] = useState([]);
    const [files, setFiles] = useState([]);
    const [thumbnails, setThumbnails] = useState([]);
    // Replace the proofType state with:
    const [proofRequirements, setProofRequirements] = useState([]);
    const [selectedProofType, setSelectedProofType] = useState('screenshot');
    const [customProofText, setCustomProofText] = useState('');

    const [countrySearch, setCountrySearch] = useState('');
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState(countries);

    const fileInputRef = useRef(null);
    const thumbnailInputRef = useRef(null);
    const countryDropdownRef = useRef(null);
    const [loading, setLoading] = useState(true); // Initialize as true to show loader initially

    // Use effect to simulate page loading
    useEffect(() => {
        // This simulates the page loading process
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 800);

        // Clean up the timeout on unmount
        return () => clearTimeout(loadingTimeout);
    }, []);

    // Filter countries based on search input
    useEffect(() => {
        if (countrySearch) {
            setFilteredCountries(countries.filter((country) => country.name.toLowerCase().includes(countrySearch.toLowerCase())));
        } else {
            setFilteredCountries(countries);
        }
    }, [countrySearch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
                setShowCountryDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const validateStep = (step) => {
        const newErrors = { ...errors };
        let isValid = true;

        if (step === 1) {
            if (!formData.jobTitle.trim()) {
                newErrors.jobTitle = 'Job title is required';
                isValid = false;
            } else {
                newErrors.jobTitle = '';
            }

            if (!formData.jobDescription.trim()) {
                newErrors.jobDescription = 'Job description is required';
                isValid = false;
            } else if (formData.jobDescription.trim().length < 20) {
                newErrors.jobDescription = 'Description must be at least 20 characters';
                isValid = false;
            } else {
                newErrors.jobDescription = '';
            }

            if (!formData.completionInstructions) {
                newErrors.completionInstructions = 'Completion instructions is required';
                isValid = false;
            } else if (formData.completionInstructions.trim().length < 20) {
                newErrors.completionInstructions = 'Completion instructions must be at least 20 characters';
                isValid = false;
            } else {
                newErrors.completionInstructions = '';
            }

            if (!formData.points) {
                newErrors.points = 'Points is required';
                isValid = false;
            } else if (isNaN(formData.points)) {
                newErrors.points = 'Points must be a number';
                isValid = false;
            } else if (parseFloat(formData.points) <= 0) {
                newErrors.points = 'Points must be greater than 0';
                isValid = false;
            } else {
                newErrors.points = '';
            }

            if (!formData.maxCompletions) {
                newErrors.maxCompletions = 'Max completions is required';
                isValid = false;
            } else if (isNaN(formData.maxCompletions)) {
                newErrors.maxCompletions = 'Max completions must be a number';
                isValid = false;
            } else if (parseFloat(formData.maxCompletions) <= 0) {
                newErrors.maxCompletions = 'Max completions must be greater than 0';
                isValid = false;
            } else {
                newErrors.maxCompletions = '';
            }

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

            if (!formData.country) {
                newErrors.country = 'Country is required';
                isValid = false;
            } else {
                newErrors.country = '';
            }

            if (!formData.jobCategory) {
                newErrors.jobCategory = 'Job category is required';
                isValid = false;
            } else {
                newErrors.jobCategory = '';
            }

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
        }

        if (step === 2) {
            // Make thumbnails mandatory
            if (thumbnails.length === 0) {
                newErrors.thumbnails = 'At least one thumbnail is required';
                isValid = false;
            } else {
                newErrors.thumbnails = '';
            }

            // Validate that there is at least one media link or file
            if (mediaLinks.length === 0 && files.length === 0) {
                newErrors.media = 'At least one media link or instruction file is required';
                isValid = false;
            } else {
                newErrors.media = '';
            }

            // If there are media links, validate each URL
            if (mediaLinks.length > 0) {
                const invalidLinks = mediaLinks.filter((link) => {
                    try {
                        new URL(link);
                        return false; // URL is valid
                    } catch (e) {
                        return true; // URL is invalid
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
        // In the validateStep function, update step 3 validation:
        if (step === 3) {
            const newErrors = { ...errors };

            if (step === 3) {
                if (proofRequirements.length === 0) {
                    newErrors.proofRequirements = 'At least one proof requirement is required';
                    isValid = false;
                } else {
                    delete newErrors.proofRequirements;
                }
            }

            setErrors(newErrors);
            return isValid;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'jobCategory') {
            setFormData({
                ...formData,
                [name]: value,
                jobLinks: value ? [microTaskCategories[value]] : [],
            });
            setErrors({ ...errors, [name]: '' });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleCountrySelect = (country) => {
        setFormData({
            ...formData,
            country: country.id,
            countryName: country.name,
        });
        setShowCountryDropdown(false);
        setCountrySearch('');
        setErrors({ ...errors, country: '' });
    };

    const handleAddMediaLink = () => {
        const linkInput = document.getElementById('mediaLink');
        const linkValue = linkInput.value.trim();

        if (linkValue) {
            try {
                // Basic URL validation
                new URL(linkValue);
                setMediaLinks([...mediaLinks, linkValue]);
                linkInput.value = '';
            } catch (e) {
                alert('Please enter a valid URL');
            }
        }
    };

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files);

        // Validate file sizes (5MB for thumbnails, 10MB for other files)
        const maxSize = e.target === thumbnailInputRef.current ? 5 : 10;
        const validFiles = newFiles.filter((file) => file.size <= maxSize * 1024 * 1024);

        if (validFiles.length !== newFiles.length) {
            alert(`Some files were too large (max ${maxSize}MB)`);
        }

        if (e.target === thumbnailInputRef.current) {
            setThumbnails([...thumbnails, ...validFiles]);
        } else {
            setFiles([...files, ...validFiles]);
        }
    };

    const handleThumbnailUpload = (e) => {
        handleFileUpload(e);
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const removeThumbnail = (index) => {
        const newThumbnails = [...thumbnails];
        newThumbnails.splice(index, 1);
        setThumbnails(newThumbnails);
    };

    const removeMediaLink = (index) => {
        const newLinks = [...mediaLinks];
        newLinks.splice(index, 1);
        setMediaLinks(newLinks);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if all steps are valid and click on the submit button
        if (validateStep(4)) {
            // Create FormData for file uploads
            const formDataToSubmit = new FormData();

            // Add basic form fields
            Object.keys(formData).forEach((key) => {
                if (key !== 'mediaLinks' && key !== 'proofRequirements') {
                    formDataToSubmit.append(key, formData[key]);
                }
            });

            // Add arrays as JSON strings
            formDataToSubmit.append('mediaLinks', JSON.stringify(mediaLinks));
            formDataToSubmit.append('proofRequirements', JSON.stringify(proofRequirements));

            // Add files
            files.forEach((file, index) => {
                formDataToSubmit.append(`files[${index}]`, file);
            });

            // Add thumbnails
            thumbnails.forEach((thumbnail, index) => {
                formDataToSubmit.append(`thumbnails[${index}]`, thumbnail);
            });

            // Use Inertia to submit the form
            router.post('/post-jobs', formDataToSubmit, {
                onSuccess: () => {
                    // setSubmitSuccess(true);
                    // Optionally reset form or redirect
                    // reset();
                    // router.visit('/dashboard');
                },
                onError: (errors) => {
                    // setSubmitError('Form submission failed. Please check the errors and try again.');
                    console.error(errors);
                },
            });
        }
    };
    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const dp =
        'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    return (
        <>
            <EmployeeDashboardLayout dp={dp}>
                <Head title="Dashboard" />
                {loading && <GlobalLoader />}
                <div className="mx-auto max-w-4xl p-4 md:p-6">
                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="relative">
                            {/* Progress Line - now properly aligned */}

                            <div className="absolute top-5 right-11 left-14 z-10 h-1 bg-gray-200">
                                <div
                                    className={`h-full bg-blue-600 transition-all duration-300 ease-in-out`}
                                    style={{ width: `${(step - 1) * 33.33}%` }}
                                >
                                    {' '}
                                </div>
                            </div>

                            {/* Steps Container */}
                            <div className="flex justify-between">
                                {[1, 2, 3, 4].map((stepNumber) => (
                                    <div key={stepNumber} className="relative z-10 flex flex-col items-center">
                                        {/* Step Number */}
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full font-medium text-white ${step >= stepNumber ? 'bg-blue-600' : 'bg-gray-400'}`}
                                        >
                                            {stepNumber}
                                        </div>
                                        {/* Step Label */}
                                        <span className={`mt-2 text-sm font-medium ${step >= stepNumber ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {stepNumber === 1 && 'Job Details'}
                                            {stepNumber === 2 && 'Media'}
                                            {stepNumber === 3 && 'Requirements'}
                                            {stepNumber === 4 && 'Review'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                        <div className="p-6 md:p-8">
                            <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">Create Job Posting</h1>
                            <p className="mb-6 text-gray-600">Step {step} of 4</p>

                            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                                {/* Step 1: Job Details */}
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="jobTitle" className="mb-1 block text-sm font-medium text-gray-700">
                                                Job Title*
                                            </label>
                                            <input
                                                type="text"
                                                id="jobTitle"
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleChange}
                                                required
                                                className={`w-full border px-4 py-3 ${errors.jobTitle ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Enter job title"
                                            />
                                            {errors.jobTitle && <p className="mt-1 text-sm text-red-600">{errors.jobTitle}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="jobDescription" className="mb-1 block text-sm font-medium text-gray-700">
                                                Job Description*
                                            </label>
                                            <textarea
                                                id="jobDescription"
                                                name="jobDescription"
                                                value={formData.jobDescription}
                                                onChange={handleChange}
                                                required
                                                rows="5"
                                                className={`w-full border px-4 py-3 ${errors.jobDescription ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Describe the job details"
                                            ></textarea>
                                            {errors.jobDescription && <p className="mt-1 text-sm text-red-600">{errors.jobDescription}</p>}
                                        </div>

                                        <div className="mt-6">
                                            <label htmlFor="completionInstructions" className="mb-1 block text-sm font-medium text-gray-700">
                                                Completion Instructions*
                                            </label>
                                            <textarea
                                                id="completionInstructions"
                                                name="completionInstructions"
                                                value={formData.completionInstructions}
                                                onChange={handleChange}
                                                required
                                                rows="6"
                                                className={`w-full border px-4 py-3 ${errors.completionInstructions ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Provide detailed instructions for workers on how to complete this task..."
                                            ></textarea>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Be specific about what workers need to do and how you'll verify their work.
                                            </p>
                                            {errors.completionInstructions && (
                                                <p className="mt-1 text-sm text-red-600">{errors.completionInstructions}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="externalLink" className="mb-1 block text-sm font-medium text-gray-700">
                                                Task URL*
                                            </label>
                                            <input
                                                type="url"
                                                id="externalLink"
                                                name="externalLink"
                                                value={formData.externalLink}
                                                onChange={handleChange}
                                                required
                                                className={`w-full border px-4 py-3 ${errors.externalLink ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                placeholder="https://example.com"
                                            />
                                            {errors.externalLink && <p className="mt-1 text-sm text-red-600">{errors.externalLink}</p>}
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="budget" className="mb-1 block text-sm font-medium text-gray-700">
                                                    Budget (USD)*
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute top-3 left-3 text-gray-500">$</span>
                                                    <input
                                                        type="number"
                                                        id="budget"
                                                        name="budget"
                                                        value={formData.budget}
                                                        onChange={handleChange}
                                                        required
                                                        min="1"
                                                        className={`w-full border px-4 py-3 pl-8 ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                        placeholder="100"
                                                    />
                                                </div>
                                                {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="deadline" className="mb-1 block text-sm font-medium text-gray-700">
                                                    Deadline*
                                                </label>
                                                <input
                                                    type="date"
                                                    id="deadline"
                                                    name="deadline"
                                                    value={formData.deadline}
                                                    onChange={handleChange}
                                                    required
                                                    className={`w-full border px-4 py-3 ${errors.deadline ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                />
                                                {errors.deadline && <p className="mt-1 text-sm text-red-600">{errors.deadline}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <label htmlFor="points" className="mb-1 block text-sm font-medium text-gray-700">
                                                        Points per Completion*
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="points"
                                                        name="points"
                                                        value={formData.points}
                                                        onChange={handleChange}
                                                        required
                                                        min="1"
                                                        max="1000"
                                                        className={`w-full border px-4 py-3 ${errors.points ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                        placeholder="100"
                                                    />
                                                    {errors.points && <p className="mt-1 text-sm text-red-600">{errors.points}</p>}
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <label htmlFor="maxCompletions" className="mb-1 block text-sm font-medium text-gray-700">
                                                    Maximum Completions
                                                </label>
                                                <input
                                                    type="number"
                                                    id="maxCompletions"
                                                    name="maxCompletions"
                                                    value={formData.maxCompletions}
                                                    onChange={handleChange}
                                                    min="0"
                                                    className={`w-full border px-4 py-3 ${errors.maxCompletions ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                    placeholder="0 for unlimited"
                                                />
                                                <p className="mt-1 text-xs text-gray-500">
                                                    Set the maximum number of times this task can be completed. Enter 0 for unlimited.
                                                </p>
                                                {errors.maxCompletions && <p className="mt-1 text-sm text-red-600">{errors.maxCompletions}</p>}
                                            </div>
                                        </div>

                                        <div className="relative" ref={countryDropdownRef}>
                                            <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700">
                                                Country*
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="country"
                                                    name="country"
                                                    value={countrySearch || formData.countryName || ''}
                                                    onChange={(e) => {
                                                        setCountrySearch(e.target.value);
                                                        if (!showCountryDropdown) setShowCountryDropdown(true);
                                                    }}
                                                    onFocus={() => setShowCountryDropdown(true)}
                                                    required
                                                    className={`w-full border px-4 py-3 ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                                    placeholder="Search or select country"
                                                />
                                                {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                                                {showCountryDropdown && (
                                                    <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                                                        {filteredCountries.length > 0 ? (
                                                            filteredCountries.map((country) => (
                                                                <div
                                                                    key={country.id}
                                                                    className={`cursor-pointer p-3 hover:bg-blue-50 ${formData.country === country.id ? 'bg-blue-100' : ''}`}
                                                                    onClick={() => handleCountrySelect(country)}
                                                                >
                                                                    {country.name}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="p-3 text-gray-500">No countries found</div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="jobCategory" className="mb-1 block text-sm font-medium text-gray-700">
                                                Job Category*
                                            </label>
                                            <select
                                                id="jobCategory"
                                                name="jobCategory"
                                                value={formData.jobCategory}
                                                onChange={handleChange}
                                                required
                                                className={`w-full border px-4 py-3 ${errors.jobCategory ? 'border-red-500' : 'border-gray-300'} rounded-lg transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                                            >
                                                <option value="">Select a job category</option>
                                                {microTaskCategories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.jobCategory && <p className="mt-1 text-sm text-red-600">{errors.jobCategory}</p>}
                                        </div>

                                        {/*{formData.jobCategory && (*/}
                                        {/*    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">*/}
                                        {/*        <h3 className="text-md mb-2 font-medium text-blue-800">Required Link:</h3>*/}
                                        {/*        <a*/}
                                        {/*            href={microTaskCategories[formData.jobCategory]}*/}
                                        {/*            target="_blank"*/}
                                        {/*            rel="noopener noreferrer"*/}
                                        {/*            className="break-all text-blue-600 hover:text-blue-800 hover:underline"*/}
                                        {/*        >*/}
                                        {/*            {microTaskCategories[formData.jobCategory]}*/}
                                        {/*        </a>*/}
                                        {/*    </div>*/}
                                        {/*)}*/}
                                    </div>
                                )}

                                {/* Step 2: Media */}
                                {/* Step 2: Media */}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Thumbnails*</label>
                                            <div
                                                className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${
                                                    errors.thumbnails ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                                                }`}
                                                onClick={() => thumbnailInputRef.current.click()}
                                            >
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                                <p className="mt-1 text-sm text-gray-600">Click to upload thumbnails</p>
                                                <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleThumbnailUpload}
                                                    ref={thumbnailInputRef}
                                                />
                                            </div>
                                            {errors.thumbnails && <p className="mt-1 text-sm text-red-600">{errors.thumbnails}</p>}

                                            {thumbnails.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="mb-2 text-sm font-medium text-gray-700">Uploaded Thumbnails:</h4>
                                                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                                        {thumbnails.map((file, index) => (
                                                            <div key={index} className="group relative overflow-hidden rounded-lg">
                                                                <img
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`Thumbnail ${index + 1}`}
                                                                    className="h-24 w-full object-cover"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeThumbnail(index)}
                                                                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-4 w-4"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M6 18L18 6M6 6l12 12"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Add Media Links or Files*</label>

                                            <div className="mb-3 flex items-center">
                                                <input
                                                    type="url"
                                                    id="mediaLink"
                                                    placeholder="Enter YouTube or media link"
                                                    className={`flex-1 border px-4 py-3 ${
                                                        errors.mediaLinks ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-l-lg transition focus:border-blue-500 focus:ring-blue-500`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddMediaLink}
                                                    className="rounded-r-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            {errors.mediaLinks && <p className="mt-1 text-sm text-red-600">{errors.mediaLinks}</p>}

                                            <div
                                                className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${
                                                    errors.media ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                                                }`}
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                <p className="mt-1 text-sm text-gray-600">Click to upload instruction files</p>
                                                <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF, MP4 up to 10MB</p>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    multiple
                                                    accept="image/*,video/*,.pdf"
                                                    onChange={handleFileUpload}
                                                    ref={fileInputRef}
                                                />
                                            </div>
                                            {errors.media && !errors.mediaLinks && <p className="mt-1 text-sm text-red-600">{errors.media}</p>}

                                            {(mediaLinks.length > 0 || files.length > 0) && (
                                                <div className="mt-4 space-y-4">
                                                    {mediaLinks.length > 0 && (
                                                        <div>
                                                            <h4 className="mb-2 text-sm font-medium text-gray-700">Media Links:</h4>
                                                            <div className="space-y-2">
                                                                {mediaLinks.map((link, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                                                    >
                                                                        <a
                                                                            href={link}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="truncate text-sm text-blue-600 hover:underline"
                                                                        >
                                                                            {link}
                                                                        </a>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeMediaLink(index)}
                                                                            className="ml-2 text-red-500 hover:text-red-700"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-5 w-5"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {files.length > 0 && (
                                                        <div>
                                                            <h4 className="mb-2 text-sm font-medium text-gray-700">Uploaded Files:</h4>
                                                            <div className="space-y-2">
                                                                {files.map((file, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                                                    >
                                                                        <div className="flex items-center">
                                                                            <svg
                                                                                className="mr-2 h-5 w-5 text-gray-500"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                {file.type.startsWith('image/') ? (
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={1.5}
                                                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                                    />
                                                                                ) : file.type.startsWith('video/') ? (
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={1.5}
                                                                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                                    />
                                                                                ) : (
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={1.5}
                                                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                                    />
                                                                                )}
                                                                            </svg>
                                                                            <span className="truncate text-sm text-gray-700">{file.name}</span>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeFile(index)}
                                                                            className="ml-2 text-red-500 hover:text-red-700"
                                                                        >
                                                                            <svg
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                className="h-5 w-5"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Requirements */}
                                {step === 3 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="mb-3 block text-sm font-medium text-gray-700">Add Proof of Work Requirements*</label>

                                            <div className="mb-4 flex flex-col gap-3 sm:flex-row">
                                                <div className="flex-1">
                                                    <select
                                                        value={selectedProofType}
                                                        onChange={(e) => setSelectedProofType(e.target.value)}
                                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                    >
                                                        <option value="screenshot">Screenshot</option>
                                                        <option value="video">Video Recording</option>
                                                        <option value="text">Text Description</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        let requirement = '';
                                                        switch (selectedProofType) {
                                                            case 'screenshot':
                                                                requirement = 'Screenshot of completed work';
                                                                break;
                                                            case 'video':
                                                                requirement = 'Video recording of the process';
                                                                break;
                                                            case 'text':
                                                                requirement = 'Text description of completed work';
                                                                break;
                                                            case 'other':
                                                                requirement = customProofText || 'Custom proof requirement';
                                                                break;
                                                        }

                                                        if (
                                                            (selectedProofType === 'other' && !customProofText.trim()) ||
                                                            proofRequirements.includes(requirement)
                                                        ) {
                                                            return;
                                                        }

                                                        setProofRequirements([...proofRequirements, requirement]);
                                                        setCustomProofText('');
                                                    }}
                                                    className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                                                >
                                                    Add
                                                </button>
                                            </div>

                                            {selectedProofType === 'other' && (
                                                <div className="mb-4">
                                                    <input
                                                        type="text"
                                                        value={customProofText}
                                                        onChange={(e) => setCustomProofText(e.target.value)}
                                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                        placeholder="Specify your custom proof requirement"
                                                    />
                                                </div>
                                            )}

                                            {errors.proofRequirements && <p className="mt-1 text-sm text-red-600">{errors.proofRequirements}</p>}

                                            {proofRequirements.length > 0 && (
                                                <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
                                                    {proofRequirements.map((req, index) => (
                                                        <div key={index} className="flex items-center justify-between p-3">
                                                            <div className="flex items-center">
                                                                <svg
                                                                    className="mr-3 h-5 w-5 text-gray-500"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                >
                                                                    {req.includes('Screenshot') && (
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={1.5}
                                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                        />
                                                                    )}
                                                                    {req.includes('Video') && (
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={1.5}
                                                                            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                        />
                                                                    )}
                                                                    {req.includes('Text') && (
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={1.5}
                                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                        />
                                                                    )}
                                                                    {!req.includes('Screenshot') &&
                                                                        !req.includes('Video') &&
                                                                        !req.includes('Text') && (
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={1.5}
                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                            />
                                                                        )}
                                                                </svg>
                                                                <span>{req}</span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newReqs = [...proofRequirements];
                                                                    newReqs.splice(index, 1);
                                                                    setProofRequirements(newReqs);
                                                                }}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Review */}
                                {step === 4 && (
                                    <div className="space-y-6">
                                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                            <h3 className="mb-3 text-lg font-medium text-blue-800">Review Your Job Posting</h3>
                                            <p className="text-sm text-blue-700">
                                                Please review all the information before submitting your job posting.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="border-b pb-4">
                                                <h3 className="mb-2 text-lg font-medium text-gray-800">Job Details</h3>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Job Title</p>
                                                        <p className="font-medium">{formData.jobTitle || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Job Category</p>
                                                        <p className="font-medium">{formData.jobCategory || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Budget</p>
                                                        <p className="font-medium">{formData.budget ? `$${formData.budget}` : 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Deadline</p>
                                                        <p className="font-medium">{formData.deadline || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Budget</p>
                                                        <p className="font-medium">{formData.budget || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Exrternal Link</p>
                                                        <p className="font-medium">{formData.externalLink || 'Not specified'}</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-500">Points</p>
                                                        <p className="font-medium">{formData.points || 'Not specified'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Country</p>
                                                        <p className="font-medium">{formData.countryName || 'Not specified'}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-b pb-4">
                                                <h3 className="mb-2 text-lg font-medium text-gray-800">Job Description</h3>
                                                <p className="whitespace-pre-line">{formData.jobDescription || 'Not specified'}</p>
                                            </div>

                                            <div className="border-b pb-4">
                                                <h3 className="mb-2 text-lg font-medium text-gray-800">Job Complete Instructions </h3>
                                                <p className="whitespace-pre-line">{formData.completionInstructions || 'Not specified'}</p>
                                            </div>

                                            <div className="border-b pb-4">
                                                <h3 className="mb-2 text-lg font-medium text-gray-800">Media & Attachments</h3>
                                                {thumbnails.length > 0 && (
                                                    <div className="mb-3">
                                                        <p className="mb-1 text-sm text-gray-500">Thumbnails</p>
                                                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                                            {thumbnails.map((file, index) => (
                                                                <img
                                                                    key={index}
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`Thumbnail ${index + 1}`}
                                                                    className="h-20 w-full rounded object-cover"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {mediaLinks.length > 0 && (
                                                    <div className="mb-3">
                                                        <p className="mb-1 text-sm text-gray-500">Media Links</p>
                                                        <div className="space-y-1">
                                                            {mediaLinks.map((link, index) => (
                                                                <a
                                                                    key={index}
                                                                    href={link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="block truncate text-sm text-blue-600 hover:underline"
                                                                >
                                                                    {link}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {files.length > 0 && (
                                                    <div>
                                                        <p className="mb-1 text-sm text-gray-500">Instruction Files</p>
                                                        <div className="space-y-1">
                                                            {files.map((file, index) => (
                                                                <div key={index} className="flex items-center text-sm">
                                                                    <svg
                                                                        className="mr-2 h-4 w-4 text-gray-500"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                                        />
                                                                    </svg>
                                                                    <span>{file.name}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* In the Step 4 section, replace the Proof of Work Requirements section with: */}
                                            <div>
                                                <h3 className="mb-2 text-lg font-medium text-gray-800">Proof of Work Requirements</h3>
                                                <div className="rounded-lg bg-gray-50 p-3">
                                                    <ul className="list-disc space-y-1 pl-5">
                                                        {proofRequirements.map((requirement, index) => (
                                                            <li key={index}>{requirement}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="mt-8 flex justify-between">
                                    {step > 1 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
                                        >
                                            Back
                                        </button>
                                    )}

                                    {step < 4 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="ml-auto rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                                        >
                                            Continue
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="ml-auto rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
                                        >
                                            Submit Job Posting
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </EmployeeDashboardLayout>
        </>
    );
}

export default JobPostingForm;
