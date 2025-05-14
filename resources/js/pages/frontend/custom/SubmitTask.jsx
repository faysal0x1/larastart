import { useState, useEffect } from "react";
import { ExternalLink, Upload, CheckCircle, AlertCircle, Loader2, Star, Clock, DollarSign, Play, ChevronRight, ChevronLeft, X } from "lucide-react";
import GlobalLoader from '../../../components/frontend/GlobalLoader';

// Reusable upload function
const uploadVideoProof = async ({
  file,
  onProgress,
  onSuccess,
  onError,
  maxFileSize = 50 * 1024 * 1024, // 50MB default
  allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm']
}) => {
  try {
    // Validate file exists
    if (!file) {
      throw new Error('No file selected');
    }

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload a video file (MP4, MOV, AVI, or WEBM)');
    }

    // Validate file size
    if (file.size > maxFileSize) {
      throw new Error(`File size too large. Maximum allowed size is ${maxFileSize / (1024 * 1024)}MB`);
    }

    // Simulate upload with progress
    const totalSteps = 100;
    let progress = 0;

    const progressInterval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        
        // Simulate API response
        setTimeout(() => {
          onSuccess({
            url: URL.createObjectURL(file),
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadedAt: new Date().toISOString()
          });
        }, 500);
      }
      
      if (onProgress) {
        onProgress(progress);
      }
    }, 200);

    // Return cleanup function
    return () => {
      clearInterval(progressInterval);
    };

  } catch (error) {
    if (onError) {
      onError(error.message || 'Failed to upload video');
    }
    return () => {}; // Return empty cleanup function
  }
};

// UI components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold text-gray-800 ${className}`}>{children}</h2>
);

const Label = ({ htmlFor, children, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
    {children}
  </label>
);

const Input = ({ id, type, className = "", ...props }) => (
  <input
    id={id}
    type={type}
    className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${className}`}
    {...props}
  />
);

const Textarea = ({ id, className = "", ...props }) => (
  <textarea
    id={id}
    className={`w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-32 ${className}`}
    {...props}
  />
);

const Button = ({ children, className = "", disabled = false, onClick, ...props }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
      } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Alert = ({ children, className = "", variant = "success" }) => {
  const variants = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800"
  };

  return (
    <div className={`p-4 rounded-lg border my-4 flex items-start ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const AlertTitle = ({ children }) => (
  <h3 className="text-sm font-medium mb-1">{children}</h3>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm">{children}</div>
);

const Badge = ({ children, icon, className = "" }) => (
  <span className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${className}`}>
    {icon && <span className="w-4 h-4">{icon}</span>}
    {children}
  </span>
);

const YouTubeEmbed = ({ videoId }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isPlaying) {
    return (
      <div
        className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer mt-6 mb-6"
        onClick={() => setIsPlaying(true)}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="Video thumbnail"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700">
            <Play size={28} className="ml-1" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 text-white">
          <p className="font-medium">Watch Tutorial Video</p>
          <p className="text-sm text-gray-300">Learn how to complete this task in detail</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video mt-6 mb-6">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

const ProductImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const shoeImages = [
    {
      url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      alt: "Black athletic shoes with blue and orange accents - three-quarter view"
    },
    {
      url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      alt: "Black athletic shoes - side view"
    },
    {
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      alt: "Black athletic shoes - top view"
    },
    {
      url: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      alt: "Shoe size chart"
    },
    {
      url: "https://images.unsplash.com/photo-1600269452173-6862820d6738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      alt: "Black athletic shoes - back view"
    }
  ];

  const goToPrevious = () => {
    const isFirstImage = selectedImage === 0;
    const newIndex = isFirstImage ? shoeImages.length - 1 : selectedImage - 1;
    setSelectedImage(newIndex);
  };

  const goToNext = () => {
    const isLastImage = selectedImage === shoeImages.length - 1;
    const newIndex = isLastImage ? 0 : selectedImage + 1;
    setSelectedImage(newIndex);
  };

  return (
    <div className="bg-orange-200 rounded-xl p-6 mb-6">
      <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden shadow-md">
        <img
          src={shoeImages[selectedImage].url}
          alt={shoeImages[selectedImage].alt}
          className="w-full h-full object-contain"
        />

        <button
          onClick={goToPrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 text-gray-800 p-2 rounded-full shadow-md hover:bg-white transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2 overflow-x-auto py-2">
        {shoeImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-white shadow-md' : 'border-transparent'} transition-all`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const FileUploadComponent = ({ files, setFiles, title, type = "image" }) => {
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      if (type === "video") {
        setIsUploading(true);
        setUploadError(null);
        
        try {
          const cleanup = await uploadVideoProof({
            file: selectedFiles[0],
            onProgress: (progress) => {
              setUploadProgress(progress);
            },
            onSuccess: (uploadResult) => {
              setFiles(prev => [...prev, selectedFiles[0]]);
              setFilePreviews(prev => [...prev, uploadResult.url]);
              setUploadProgress(null);
              setIsUploading(false);
            },
            onError: (error) => {
              setUploadError(error);
              setIsUploading(false);
            }
          });
        } catch (error) {
          setUploadError(error.message);
          setIsUploading(false);
        }
      } else {
        // Handle image uploads normally
        setFiles([...files, ...selectedFiles]);
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setFilePreviews([...filePreviews, ...newPreviews]);
      }
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <Label>{title}</Label>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
        <input
          type="file"
          id={`fileInput-${title.replace(/\s+/g, '-')}`}
          className="hidden"
          onChange={handleFileChange}
          multiple={type !== "video"}
          accept={type === "video" ? "video/*" : "image/*"}
        />
        <label htmlFor={`fileInput-${title.replace(/\s+/g, '-')}`} className="cursor-pointer text-center">
          <Upload className="h-10 w-10 text-gray-400 mb-3 mx-auto" />
          <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500 mt-1">
            {type === "video" ? "MP4, MOV, AVI or WEBM (max. 50MB)" : "SVG, PNG, JPG or GIF (max. 2MB)"}
          </p>
        </label>
      </div>

      {uploadProgress !== null && (
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {uploadError && (
        <p className="mt-2 text-sm text-red-600">{uploadError}</p>
      )}

      {filePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="relative h-24 rounded-lg overflow-hidden border border-gray-200">
                {type === "video" ? (
                  <video className="w-full h-full object-cover" controls>
                    <source src={preview} type={files[index].type} />
                  </video>
                ) : (
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-0 right-0 m-1 bg-white/80 hover:bg-white p-1 rounded-full text-gray-600 hover:text-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-1 text-xs truncate">{files[index].name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function JobSubmissionForm() {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [showError, setShowError] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [myFiles, setMyFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const youtubeVideoId = "xf6iVsy9anI";

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if ((myFiles.length === 0 && videoFiles.length === 0) || !feedback.trim()) {
      setShowError(true);
      return;
    }

    setSubmitStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success");
    }, 2000);
  };

  const openJobLink = () => {
    window.open("https://example.com/job-link", "_blank");
  };

  return (
    <>
      {loading && <GlobalLoader />}
      <div className="container mx-auto p-4 max-w-4xl">
        <Card>
          <CardHeader>
            <div className="relative w-full h-48 sm:h-64 bg-gradient-to-r from-blue-500 to-purple-600">
              <img
                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Job thumbnail"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <CardTitle className="text-white">Social Media Content Review</CardTitle>
                  <p className="text-gray-200">Posted by Digital Marketing Agency</p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3 mt-4">
              <Badge icon={<Star className="w-3 h-3" />} className="bg-blue-100 text-blue-800">
                4.8 Rating
              </Badge>
              <Badge icon={<Clock className="w-3 h-3" />} className="bg-green-100 text-green-800">
                1-2 Hours
              </Badge>
              <Badge icon={<DollarSign className="w-3 h-3" />} className="bg-purple-100 text-purple-800">
                $25-50
              </Badge>
              <Badge className="bg-gray-100 text-gray-800">
                Remote
              </Badge>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Job Description</h3>
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <p className="mb-4 text-gray-700">
                  We are looking for detailed feedback on our recent YouTube content. This task involves:
                </p>
                <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
                  <li>Subscribe to our YouTube channel</li>
                  <li>Watch our latest video (approximately 10 minutes)</li>
                  <li>Take a screenshot showing you've subscribed</li>
                  <li>Provide detailed feedback about the content quality and engagement</li>
                </ol>
                <p className="text-gray-700">
                  Your submission should include both the screenshot and your written feedback.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Product Reference</h3>
              <ProductImageGallery />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">How to Complete This Task</h3>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                <p className="mb-4 text-gray-700">
                  Follow these steps to complete the task correctly. Make sure to review both the screenshots and watch the tutorial video below.
                </p>
                <YouTubeEmbed videoId={youtubeVideoId} />
              </div>
            </div>

            <div className="flex flex-col items-center mt-2">
              <Button
                onClick={openJobLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              >
                <ExternalLink size={16} />
                <span>Open Job Link</span>
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Submit Your Work</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="feedback">Task Description</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Enter your detailed feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="resize-none"
                  />
                </div>

                <FileUploadComponent
                  files={myFiles}
                  setFiles={setMyFiles}
                  title="Upload Your Screenshot"
                  type="image"
                />

                <FileUploadComponent
                  files={videoFiles}
                  setFiles={setVideoFiles}
                  title="Upload Your Video Proof"
                  type="video"
                />

                {showError && (
                  <Alert variant="error">
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <AlertTitle>Missing Information</AlertTitle>
                      <AlertDescription>
                        Please provide both your feedback and at least one proof file (screenshot or video).
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                {submitStatus === "success" && (
                  <Alert variant="success">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <div>
                      <AlertTitle>Success!</AlertTitle>
                      <AlertDescription>
                        Your submission has been received. The client will review your work soon.
                      </AlertDescription>
                    </div>
                  </Alert>
                )}

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-green-200 hover:shadow-lg"
                  disabled={submitStatus === "submitting" || submitStatus === "success"}
                >
                  {submitStatus === "submitting" ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : submitStatus === "success" ? (
                    <div className="flex items-center justify-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Submitted Successfully</span>
                    </div>
                  ) : (
                    "Submit Work"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-4 text-xs text-gray-500 gap-2">
            <div className="flex items-center gap-2">
              <span>Posted 2 days ago</span>
              <span>•</span>
              <span>12 applicants</span>
            </div>
            <p>Job ID: JOB-12345</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}