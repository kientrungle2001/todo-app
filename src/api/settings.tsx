import { TableGridSettings } from "@/components/grid/TableGrid";
import { FullLookStudentSettings } from "./settings/FullLookStudentSettings";
import { FullLookAdminUserSettings } from "./settings/FullLookUserSettings";
import { FullLookAdminCategoriesSettings } from "./settings/FullLookCategoriesSettings";
import { FullLookAdminQuestionSettings } from "./settings/FullLookQuestionSettings";
import { FullLookAdminServicePackagesSettings } from "./settings/FullLookServicePackagesSettings";
import { FullLookAdminTestSettings } from "./settings/FullLookTestSettings";
import { FullLookAdminHistoryPaymentSettings } from "./settings/FullLookHistoryPaymentSettings";
import { FullLookAdminMenuSettings } from "./settings/FullLookMenuSettings";
import { FullLookAdminDocumentSettings } from "./settings/FullLookDocumentSettings";
import { FullLookAdminBookSettings } from "./settings/FullLookBookSettings";
import { FullLookAdminContestSettings } from "./settings/FullLookContestSettings";
import { FullLookAdminQuestionErrorSettings } from "./settings/FullLookQuestionErrorSettings";
import { FullLookAdminVoteSettings } from "./settings/FullLookVoteSettings";
import { FullLookAdminBannerSettings } from "./settings/FullLookBannerSettings";
import { FullLookAdminMediaSettings } from "./settings/FullLookMediaSettings";
import { FullLookAdminNewsSettings } from "./settings/FullLookNewsSettings";
import { FullLookAdminAQSQuestionSettings } from "./settings/FullLookAQSQuestionSettings";
import { FullLookAdminAQSAnswerSettings } from "./settings/FullLookAQSAnswerSettings";
import { FullLookAdminWalletSettings } from "./settings/FullLookWalletSettings";
import { FullLookAdminCouponSettings } from "./settings/FullLookCouponSettings";
import { FullLookAdminCouponUserSettings } from "./settings/FullLookCouponUserSettings";
import { FullLookAdminOrderCardSettings } from "./settings/FullLookOrderCardSettings";
import { FullLookAdminNextNobelsCardSettings } from "./settings/FullLookNextNobelsCardSettings";
import { FullLookAdminGameSettings } from "./settings/FullLookGameSettings";
import { FullLookAdminGameTopicSettings } from "./settings/FullLookGameTopicSettings";
import { FullLookAdminGameTypeSettings } from "./settings/FullLookGameTypeSettings";
import { FullLookAdminServicePolicySettings } from "./settings/FullLookServicePolicySettings";
import { FullLookAdminMobileCardSettings } from "./settings/FullLookMobileCardSettings";
import { FullLookAdminOrderTransactionSettings } from "./settings/FullLookOrderTransactionSettings";
import { FullLookAdminThemeSettings } from "./settings/FullLookThemeSettings";
import { FullLookAdminLogSettings } from "./settings/FullLookLogSettings";
import { FullLookAdminLevelSettings } from "./settings/FullLookAdminLevelSettings";
import { FullLookAdminLevelActionSettings } from "./settings/FullLookAdminLevelActionSettings";
import { getConfigsByHostName } from "./defaultSettings";
import { PmtvAdminCategoriesSettings } from "./settings/PmtvCategoriesSettings";
import { PmtvAdminTestSettings } from "./settings/PmtvTestSettings";
import { PmtvAdminCourseSettings } from "./settings/PmtvCourseSettings";
import { PmtvAdminServicePackagesSettings } from "./settings/PmtvServicePackagesSettings";
import { PmtvAdminCourseResourceSettings } from "./settings/PmtvCourseResourceSettings";
import { PmtvAdminQuestionSettings } from "./settings/PmtvQuestionSettings";
import { PmtvAdminHistoryPaymentSettings } from "./settings/PmtvHistoryPaymentSettings";

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
        return FullLookAdminDocumentSettings
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
