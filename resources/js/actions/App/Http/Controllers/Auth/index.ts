import RegisteredUserController from './RegisteredUserController'
import AuthenticatedSessionController from './AuthenticatedSessionController'
import PasswordResetLinkController from './PasswordResetLinkController'
import NewPasswordController from './NewPasswordController'
import SocialAuthController from './SocialAuthController'
import EmailVerificationPromptController from './EmailVerificationPromptController'
import VerifyEmailController from './VerifyEmailController'
import EmailVerificationNotificationController from './EmailVerificationNotificationController'
import ConfirmablePasswordController from './ConfirmablePasswordController'

const Auth = {
    RegisteredUserController, 
    AuthenticatedSessionController, 
    PasswordResetLinkController, 
    NewPasswordController, 
    SocialAuthController, 
    EmailVerificationPromptController, 
    VerifyEmailController, 
    EmailVerificationNotificationController, 
    ConfirmablePasswordController,
}

export default Auth