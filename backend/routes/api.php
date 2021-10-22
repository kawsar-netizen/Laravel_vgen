<?php
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerPersonalInfoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Notifications\ValueSeekerVerifyEmail;
use App\Notifications\ValueGeneratorVerifyEmail;
use App\Http\Controllers\SslCommerzPaymentController;
use App\Http\Controllers\Api\Admin\AdminJobController;
use App\Http\Controllers\Api\Admin\AdminAuthController;
use App\Http\Controllers\ValueGeneratorRegisterController;
use App\Http\Controllers\Api\ValueSeeker\PaymentController;
use App\Http\Controllers\Api\ValueSeeker\AddMoneyController;
use App\Http\Controllers\ValueSeekerPersonalInfosController;
use App\Http\Controllers\ValueSeekerRegisterationController;
use App\Http\Controllers\Api\Admin\AdminSettingBasicController;
use App\Http\Controllers\Api\Admin\AdminValueSeekerListController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerJobController;
use App\Http\Controllers\Api\Admin\AdminPaymentDashboardController;
use App\Http\Controllers\Api\ValueSeeker\ValueGeneratorProfileView;
//use App\Http\Controllers\Api\ValueSeeker\ValueSeekerPersonalInfoController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerAuthController;
use App\Http\Controllers\Api\Admin\AdminValueGeneratorListController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerAddressController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerPaymentController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerJobSkillController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerLanguageController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorJobController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorAuthController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorApplyController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorSkillController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerVerifyEmailController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorWalletController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorAddressController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerCompletedTaskController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerPaymentMethodController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorLanguageController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerForgetPasswordController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorEducationController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerPersonalDetailsController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerPendingSelectionController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorCertificateController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorOngoingTaskController;
use App\Http\Controllers\API\ValueGenerator\ValueGeneratorSocialLoginController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorVerifyEmailController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerProfilePercentageController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorPersonalInfoController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorPaymentMethodController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerOrganizationDetailsController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorForgetPasswordController;
//use App\Http\Controllers\Api\Admin\AdminSettingBasicController;
//use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorWalletController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorProfileViewController;
//use App\Http\Controllers\Api\Admin\AdminValueGeneratorListController;
//use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorJobController;
//use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorOngoingTaskController;
//use App\Http\Controllers\Api\ValueSeeker\ValueSeekerCompletedTaskController;
use App\Http\Controllers\Api\ValueSeeker\ValueSeekerOngoingTaskController;
//use App\Http\Controllers\SslCommerzPaymentController;
//use App\Http\Controllers\Api\Admin\AdminValueSeekerListController;
//use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorLanguageController;
//use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorEducationController;
//use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorCertificateController;
//use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorSkillController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorPersonalDetailsController;
//use App\Http\Controllers\Api\ValueSeeker\ValueSeekerLanguageController;
//use App\Http\Controllers\Api\ValueSeeker\ValueSeekerPaymentMethodController;
//use App\Http\Controllers\Api\ValueSeeker\ValueSeekerProfilePercentageController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorCompletedTaskController;
use App\Http\Controllers\Api\ValueGenerator\ValueGeneratorProfilePercentageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('email/verify', function () {
    return response()->json(['message' => 'Mail is not verified yet you can verify or resend verification link'], 200);
})->name('verification.notice');


Route::group(['prefix' => 'seeker'], function () {
    Route::post('login', [ValueSeekerAuthController::class, 'login']);
    // Route::post('register', [ValueSeekerAuthController::class, 'register']);
    Route::post('forgot-password', [ValueSeekerForgetPasswordController::class, 'forgotPassword']);
    Route::post('reset-password', [ValueSeekerForgetPasswordController::class, 'resetPassword']);

    
//Personal Code for Project
    Route::post('register', [ValueSeekerRegisterationController::class,'registeration']);
    Route::post('login',[ValueSeekerRegisterationController::class,'login']);

    // Route::post('register', [ValueSeekerAuthController::class, 'register']);
    Route::post('login/{provider}/callback', [ValueSeekerAuthController::class, 'socialUser']);

    //Verify email
    Route::get('email/verify/{id}/{hash}', ValueSeekerVerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('value.seeker.verification.verify');
    Route::post('login', [ValueSeekerAuthController::class, 'login']);
    Route::middleware(['auth:vs-api'])->group(function () {


        // Resend link to verify email
        Route::post('email/verify/resend', function (Request $request) {
            $request->user()->notify(new ValueSeekerVerifyEmail($request->user()));
            return response()->json(['message' => 'Verification link sent!']);
        })->middleware(['throttle:6,1'])->name('value.seeker.verification.send');
        Route::middleware(['verified'])->group(function () {
            //edit profile
            //Route::post('edit-profile', [ValueSeekerPersonalInfoController::class, 'editProfile']);
            Route::get('edit-profile', [ValueSeekerPersonalDetailsController::class, 'edit']);
            Route::post('update-profile',[ValueSeekerPersonalDetailsController::class, 'store']);
            Route::resource('languages', ValueSeekerLanguageController::class);
            Route::get('edit-organization-profile', [ValueSeekerOrganizationDetailsController::class,'edit']);
            Route::post('update-organization-profile', [ValueSeekerOrganizationDetailsController::class,'store']);
            Route::post('profile-address', [ValueSeekerAddressController::class, 'storeAddress']);
            Route::post('personalinfo', [ValueSeekerPersonalInfoController::class, 'getPersonalInfo']);

            //editProfile -> profilePercentage
            Route::get('profile-percentage',[ValueSeekerProfilePercentageController::class,'profilePercentage']);

            Route::post('payment-method', [ValueSeekerPaymentController::class, 'updatePaymentProfile']);
            Route::resource('job', ValueSeekerJobController::class);
            Route::delete('job/skill/{id}', [ValueSeekerJobSkillController::class, 'deleteSkills']);
            Route::get('pending/jobs', [ValueSeekerPendingSelectionController::class, 'getJobs']);
            Route::post('/payment-method/{id}', [PaymentController::class], 'profilePayment');
            Route::get('projects-count', [ValueSeekerPendingSelectionController::class, 'countProjects']);

            //add money
            Route::post('/payment-request/{id}', [AddMoneyController::class], 'payment_request');
            Route::post('/payment-request', [AddMoneyController::class], 'payment_request_list');

            Route::get('pending/job/{id}/applicant-details/', [ValueSeekerPendingSelectionController::class, 'getApplicantDetails']);
            Route::get('pending/job/{id}/job-details/', [ValueSeekerPendingSelectionController::class, 'getPendingJobDetails']);

            //Generator Profile View

            Route::get('completed-tasks', [ValueSeekerCompletedTaskController::class, 'getCompletedTasks']);
            Route::get('completed-task/{id}/details', [ValueSeekerCompletedTaskController::class, 'getCompletedTaskDetails']);
            Route::post('project/{id}/mark-as-completed', [ValueSeekerCompletedTaskController::class, 'storeProjectCompletionDate']);
            Route::get('ongoing-tasks', [ValueSeekerOngoingTaskController::class, 'getOngoingTasks']);
            Route::get('ongoing-task/{id}/details', [ValueSeekerOngoingTaskController::class, 'getOngoingTaskDetails']);
            //editProfilePayment -> Bank
            Route::get('bank-list',[ValueSeekerPaymentMethodController::class,'showAdminBankList']);
            Route::post('add-bank',[ValueSeekerPaymentMethodController::class,'addBank']);
            Route::get('show-bank',[ValueSeekerPaymentMethodController::class,'showValueSeekerBankList']);
            Route::get('remove-bank/{id}',[ValueSeekerPaymentMethodController::class,'removeBank']);

            //editProfilePayment -> Mobile Bank
            Route::get('mobile-bank-list',[ValueSeekerPaymentMethodController::class,'showAdminMobileBankList']);
            Route::post('add-mobile-bank',[ValueSeekerPaymentMethodController::class,'addMobileBank']);
            Route::get('show-mobile-bank',[ValueSeekerPaymentMethodController::class,'showSeekerMobileBankList']);
            Route::get('remove-mobile-bank/{id}',[ValueSeekerPaymentMethodController::class,'removeMobileBank']);
        });
        Route::post('logout', [ValueSeekerAuthController::class, 'logout']);
    });
});



Route::prefix('generator')->group(function () {
    // Route::post('register', [ValueGeneratorAuthController::class, 'registration']);
    Route::post('forgot-password', [ValueGeneratorForgetPasswordController::class, 'forgotPassword']);
    Route::post('reset-password', [ValueGeneratorForgetPasswordController::class, 'resetPassword']);

    //Personal Code for Project
    Route::post('register',[ValueGeneratorRegisterController::class,'register']);
    Route::post('login',[ValueGeneratorRegisterController::class,'login']);

    //Verify email
    Route::get('email/verify/{id}/{hash}', ValueGeneratorVerifyEmailController::class)->middleware(['signed', 'throttle:6,1'])->name('value.generator.verification.verify');
    Route::post('login', [ValueGeneratorAuthController::class, 'login'])->name('login');
    Route::post('login/{provider}/callback', [ValueGeneratorAuthController::class, 'socialLogin']);
    Route::middleware(['auth:vg-api'])->group(function () {
        // Resend link to verify email
        Route::post('email/verify/resend', function (Request $request) {
            $request->user()->notify(new ValueGeneratorVerifyEmail($request->user()));
            return response()->json(['message' => 'Verification link sent!']);
        })->middleware(['throttle:6,1'])->name('value.generator.verification.send');

        Route::middleware(['verified'])->group(function () {
            Route::get('view-profile', [ValueGeneratorPersonalInfoController::class, 'viewProfile']);
            Route::post('edit-profile', [ValueGeneratorPersonalInfoController::class, 'editProfile']);
            Route::post('add-address', [ValueGeneratorAddressController::class, 'addAddress']);
            Route::get('view-address', [ValueGeneratorAddressController::class, 'viewAddress']);
            Route::get('show-payment',[ValueGeneratorPaymentMethodController::class,'showPayment']);
            Route::post('profile-payment', [ValueGeneratorPaymentMethodController::class, 'profilePayment']);

            //editProfile -> profilePercentage generator
            Route::get('profile-percentage',[ValueGeneratorProfilePercentageController::class,'profilePercentage']);


            //editProfilePayment -> Bank
         Route::get('bank-list',[ValueGeneratorPaymentMethodController::class,'showAdminBankList']);
         Route::post('add-bank',[ValueGeneratorPaymentMethodController::class,'addBank']);
         Route::get('show-bank',[ValueGeneratorPaymentMethodController::class,'showGeneratorBankList']);
         Route::get('remove-bank/{id}',[ValueGeneratorPaymentMethodController::class,'removeBank']);

            //editProfilePayment -> Mobile Bank
         Route::get('mobile-bank-list',[ValueGeneratorPaymentMethodController::class,'showAdminMobileBankList']);
         Route::post('add-mobile-bank',[ValueGeneratorPaymentMethodController::class,'addMobileBank']);
         Route::get('show-mobile-bank',[ValueGeneratorPaymentMethodController::class,'showGeneratorMobileBankList']);
         Route::get('remove-mobile-bank/{id}',[ValueGeneratorPaymentMethodController::class,'removeMobileBank']);


            //Work With ResourceController
         Route::resource('languages',ValueGeneratorLanguageController::class);
         Route::resource('educations',ValueGeneratorEducationController::class);
         Route::resource('certificates',ValueGeneratorCertificateController::class);
         Route::resource('skills',ValueGeneratorSkillController::class);
         Route::resource('details',ValueGeneratorPersonalDetailsController::class);
         Route::get('wallet', [ValueGeneratorWalletController::class, 'GeneratorWallet']);
         Route::get('wallet', [ValueGeneratorWalletController::class, 'GeneratorWallet']);
         Route::get('ongoing-tasks', [ValueGeneratorOngoingTaskController::class, 'getOngoingTasks']);
         Route::get('ongoing-tasks/{id}/show', [ValueGeneratorOngoingTaskController::class, 'getProject']);
            //Route::get('job/{id}', [ValueSeekerJobController::class, 'show']);
         Route::post('ongoing-tasks/{id}/update-progress', [ValueGeneratorOngoingTaskController::class, 'updateProgress']);
         Route::post('ongoing-tasks/{id}/store-file', [ValueGeneratorOngoingTaskController::class, 'storeFile']);

         Route::get('jobs/{query?}', [ValueGeneratorJobController::class, 'index']);
         Route::get('bid-for-it/{id}', [ValueGeneratorJobController::class, 'getJobForBid']);
         Route::get('job/{id}/details', [ValueGeneratorJobController::class, 'getJobWithClient']);
         Route::get('projects-count', [ValueGeneratorJobController::class, 'countProjects']);
         Route::post('job/apply/{id}', [ValueGeneratorApplyController::class, 'store']);
         Route::get('you-bid-here/{applyId}',  [ValueGeneratorApplyController::class, 'getApply']);
         Route::get('completed-tasks', [ValueGeneratorCompletedTaskController::class, 'getCompletedTasks']);
         Route::get('completed-task/{id}/details',[ValueGeneratorCompletedTaskController::class, 'getCompletedTaskDetails']);
     });

        Route::get('logout', [ValueGeneratorAuthController::class, 'logout']);
    });
});

Route::prefix('admin')->group(function () {

    Route::post('login', [AdminAuthController::class, 'login']);
    Route::middleware(['auth:admin-api'])->group(function () {
        Route::get('job-approve/{id}', [AdminJobController::class, 'approve']);
        Route::get('job-approval-waiting-list/{query?}', [AdminJobController::class, 'getJobs']);
        Route::get('job/{id}', [AdminJobController::class, 'findById']);
        Route::get('logout', [AdminAuthController::class, 'logout']);

        //Value Generator List
        Route::get('generator-list', [AdminValueGeneratorListController::class, 'generatorList']);
        Route::get('generator-status/{id}', [AdminValueGeneratorListController::class, 'generatorStatus']);
        Route::get('generator-information/{id}', [AdminValueGeneratorListController::class, 'generatorInformation']);
        Route::get('generator-work-history/{id}', [AdminValueGeneratorListController::class, 'generatorWorkList']);
        Route::get('generator-work-details/{projectId}', [AdminValueGeneratorListController::class, 'generatorJobDetails']);
        Route::get('generator-work-invoice/{projectId}', [AdminValueGeneratorListController::class, 'generatorWorkInvoice']);

        //Value Seeker List
        Route::get('seeker-list', [AdminValueSeekerListController::class, 'seekerList']);
        Route::get('seeker-status/{id}', [AdminValueSeekerListController::class, 'seekerStatus']);
        Route::get('seeker-information/{id}', [AdminValueSeekerListController::class, 'seekerInformation']);
        Route::get('seeker-work-history/{id}', [AdminValueSeekerListController::class, 'seekerWorkList']);
        Route::get('seeker-work-details/{projectId}', [AdminValueSeekerListController::class, 'seekerJobDetails']);
        Route::get('seeker-work-invoice/{projectId}', [AdminValueSeekerListController::class, 'seekerWorkInvoice']);
        //Admin Setting Basic Part
        
        Route::get('setting-basic', [AdminSettingBasicController::class, 'getAllBasicInformation']);
        Route::post('edit-commission', [AdminSettingBasicController::class, 'editCommission']);

        Route::post('add-bank', [AdminSettingBasicController::class, 'addBank']);
        Route::get('bank-status/{id}', [AdminSettingBasicController::class, 'bankStatus']);
        Route::get('bank-delete/{id}', [AdminSettingBasicController::class, 'bankDelete']);

        Route::post('add-mobile-bank', [AdminSettingBasicController::class, 'addMobileBank']);
        Route::get('mobile-bank-status/{id}', [AdminSettingBasicController::class, 'mobileBankStatus']);
        Route::get('mobile-bank-delete/{id}', [AdminSettingBasicController::class, 'mobileBankDelete']);
        
        Route::get('payment/value-posted', [AdminPaymentDashboardController::class, 'getValueSeekersDetails']);
        Route::get('payment/pending-payments', [AdminPaymentDashboardController::class, 'getPendingPayments']);
        Route::get('payment/value-active', [AdminPaymentDashboardController::class, 'getValueActive']);
        Route::get('payment/seeker/{id}/view-history', [AdminPaymentDashboardController::class, 'viewHistory']);
    });
});
