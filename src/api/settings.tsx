import { TableGridSettings } from "@/components/grid/TableGrid";
import { FullLookStudentSettings } from "./settings/fulllook/FullLookStudentSettings";
import { FullLookAdminUserSettings } from "./settings/fulllook/FullLookUserSettings";
import { FullLookAdminCategoriesSettings } from "./settings/fulllook/FullLookCategoriesSettings";
import { FullLookAdminQuestionSettings } from "./settings/fulllook/FullLookQuestionSettings";
import { FullLookAdminServicePackagesSettings } from "./settings/fulllook/FullLookServicePackagesSettings";
import { FullLookAdminTestSettings } from "./settings/fulllook/FullLookTestSettings";
import { FullLookAdminHistoryPaymentSettings } from "./settings/fulllook/FullLookHistoryPaymentSettings";
import { FullLookAdminMenuSettings } from "./settings/fulllook/FullLookMenuSettings";
import { FullLookAdminDocumentSettings } from "./settings/fulllook/FullLookDocumentSettings";
import { FullLookAdminBookSettings } from "./settings/fulllook/FullLookBookSettings";
import { FullLookAdminContestSettings } from "./settings/fulllook/FullLookContestSettings";
import { FullLookAdminQuestionErrorSettings } from "./settings/fulllook/FullLookQuestionErrorSettings";
import { FullLookAdminVoteSettings } from "./settings/fulllook/FullLookVoteSettings";
import { FullLookAdminBannerSettings } from "./settings/fulllook/FullLookBannerSettings";
import { FullLookAdminMediaSettings } from "./settings/fulllook/FullLookMediaSettings";
import { FullLookAdminNewsSettings } from "./settings/fulllook/FullLookNewsSettings";
import { FullLookAdminAQSQuestionSettings } from "./settings/fulllook/FullLookAQSQuestionSettings";
import { FullLookAdminAQSAnswerSettings } from "./settings/fulllook/FullLookAQSAnswerSettings";
import { FullLookAdminWalletSettings } from "./settings/fulllook/FullLookWalletSettings";
import { FullLookAdminCouponSettings } from "./settings/fulllook/FullLookCouponSettings";
import { FullLookAdminCouponUserSettings } from "./settings/fulllook/FullLookCouponUserSettings";
import { FullLookAdminOrderCardSettings } from "./settings/fulllook/FullLookOrderCardSettings";
import { FullLookAdminNextNobelsCardSettings } from "./settings/fulllook/FullLookNextNobelsCardSettings";
import { FullLookAdminGameSettings } from "./settings/fulllook/FullLookGameSettings";
import { FullLookAdminGameTopicSettings } from "./settings/fulllook/FullLookGameTopicSettings";
import { FullLookAdminGameTypeSettings } from "./settings/fulllook/FullLookGameTypeSettings";
import { FullLookAdminServicePolicySettings } from "./settings/fulllook/FullLookServicePolicySettings";
import { FullLookAdminMobileCardSettings } from "./settings/fulllook/FullLookMobileCardSettings";
import { FullLookAdminOrderTransactionSettings } from "./settings/fulllook/FullLookOrderTransactionSettings";
import { FullLookAdminThemeSettings } from "./settings/fulllook/FullLookThemeSettings";
import { FullLookAdminLogSettings } from "./settings/fulllook/FullLookLogSettings";
import { FullLookAdminLevelSettings } from "./settings/fulllook/FullLookAdminLevelSettings";
import { FullLookAdminLevelActionSettings } from "./settings/fulllook/FullLookAdminLevelActionSettings";
import { getConfigsByHostName } from "./defaultSettings";
import { PmtvAdminCategoriesSettings } from "./settings/pmtv/PmtvCategoriesSettings";
import { PmtvAdminTestSettings } from "./settings/pmtv/PmtvTestSettings";
import { PmtvAdminCourseSettings } from "./settings/pmtv/course/PmtvCourseSettings";
import { PmtvAdminServicePackagesSettings } from "./settings/pmtv/PmtvServicePackagesSettings";
import { PmtvAdminCourseResourceSettings } from "./settings/pmtv/course/PmtvCourseResourceSettings";
import { PmtvAdminQuestionSettings } from "./settings/pmtv/PmtvQuestionSettings";
import { PmtvAdminHistoryPaymentSettings } from "./settings/pmtv/PmtvHistoryPaymentSettings";
import { PmtvAdminNewsSettings } from "./settings/pmtv/PmtvNewsSettings";
import { PmtvAdminDocumentSettings } from "./settings/pmtv/PmtvDocumentSettings";

export const getSettingsByController = (controller: string, hostname: string = 'localhost'): TableGridSettings | null => {
    const hostnameConfigs = getConfigsByHostName(hostname);
    console.log(hostnameConfigs.appName);

    if (controller === "student") {
        return FullLookStudentSettings
    } else if (controller === "user" || controller === "admin_user") {
        return FullLookAdminUserSettings
    } else if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminHistoryPaymentSettings;
        }
        return FullLookAdminHistoryPaymentSettings;
    } else if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminServicePackagesSettings
        }
        return FullLookAdminServicePackagesSettings
    } else if (controller === "admin_menu") {
        return FullLookAdminMenuSettings
    } else if (controller === "admin_category") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminCategoriesSettings
        }
        return FullLookAdminCategoriesSettings
    } else if (controller === "admin_question2") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminQuestionSettings
        }
        return FullLookAdminQuestionSettings
    } else if (controller === "admin_document") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminDocumentSettings;
        }
        return FullLookAdminDocumentSettings;
    } else if (controller === "admin_test") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminTestSettings
        }
        return FullLookAdminTestSettings
    } else if (controller === "admin_book") {
        return FullLookAdminBookSettings
    } else if (controller === "admin_contest") {
        return FullLookAdminContestSettings
    } else if (controller === "admin_questionerror") {
        return FullLookAdminQuestionErrorSettings
    } else if (controller === "admin_vote") {
        return FullLookAdminVoteSettings
    } else if (controller === "admin_banner") {
        return FullLookAdminBannerSettings
    } else if (controller === "admin_media") {
        return FullLookAdminMediaSettings
    } else if (controller === "admin_news") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminNewsSettings
        }
        return FullLookAdminNewsSettings
    } else if (controller === "admin_aqsquestion") {
        return FullLookAdminAQSQuestionSettings
    } else if (controller === "admin_aqsanswer") {
        return FullLookAdminAQSAnswerSettings
    } else if (controller === "admin_wallets") {
        return FullLookAdminWalletSettings
    } else if (controller === "admin_coupon") {
        return FullLookAdminCouponSettings
    } else if (controller === "admin_coupon_user") {
        return FullLookAdminCouponUserSettings
    } else if (controller === "admin_ordercard") {
        return FullLookAdminOrderCardSettings
    } else if (controller === "admin_service_cardnexnobels") {
        return FullLookAdminNextNobelsCardSettings
    } else if (controller === "admin_game") {
        return FullLookAdminGameSettings
    } else if (controller === "admin_gametopic") {
        return FullLookAdminGameTopicSettings
    } else if (controller === "admin_gametype") {
        return FullLookAdminGameTypeSettings
    } else if (controller === "admin_service_policy") {
        return FullLookAdminServicePolicySettings
    } else if (controller === "admin_cardmobile") {
        return FullLookAdminMobileCardSettings
    } else if (controller === "admin_order_transaction") {
        return FullLookAdminOrderTransactionSettings;
    } else if (controller === "admin_themes") {
        return FullLookAdminThemeSettings;
    } else if (controller === "admin_log") {
        return FullLookAdminLogSettings;
    } else if (controller === "admin_adminlevel") {
        return FullLookAdminLevelSettings;
    } else if (controller === "admin_levelaction") {
        return FullLookAdminLevelActionSettings
    } else if (controller === "admin_course") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminCourseSettings
        }
        return PmtvAdminCourseSettings
    } else if (controller === "admin_course_resource") {
        if (hostnameConfigs.appName == 'pmtv') {
            return PmtvAdminCourseResourceSettings
        }
        return PmtvAdminCourseResourceSettings
    }
    return null;
}

export const appEnv: string = process.env.NEXT_PUBLIC_APP_ENV || 'development';
