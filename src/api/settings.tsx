import { TableGridSettings } from "@/components/grid/TableGrid";
import { FullLookStudentSettings } from "./settings/fulllook/fee/FullLookStudentSettings";
import { FullLookAdminUserSettings } from "./settings/fulllook/fee/FullLookUserSettings";
import { FullLookAdminCategoriesSettings } from "./settings/fulllook/FullLookCategoriesSettings";
import { FullLookAdminQuestionSettings } from "./settings/fulllook/education/content/FullLookQuestionSettings";
import { FullLookAdminServicePackagesSettings } from "./settings/fulllook/fee/FullLookServicePackagesSettings";
import { FullLookAdminTestSettings } from "./settings/fulllook/education/content/FullLookTestSettings";
import { FullLookAdminHistoryPaymentSettings } from "./settings/fulllook/fee/FullLookHistoryPaymentSettings";
import { FullLookAdminMenuSettings } from "./settings/fulllook/FullLookMenuSettings";
import { FullLookAdminDocumentSettings } from "./settings/fulllook/education/content/FullLookDocumentSettings";
import { FullLookAdminBookSettings } from "./settings/fulllook/education/book/FullLookBookSettings";
import { FullLookAdminContestSettings } from "./settings/fulllook/education/content/FullLookContestSettings";
import { FullLookAdminQuestionErrorSettings } from "./settings/fulllook/education/feedback/FullLookQuestionErrorSettings";
import { FullLookAdminVoteSettings } from "./settings/fulllook/FullLookVoteSettings";
import { FullLookAdminBannerSettings } from "./settings/fulllook/cms/FullLookBannerSettings";
import { FullLookAdminMediaSettings } from "./settings/fulllook/education/content/FullLookMediaSettings";
import { FullLookAdminNewsSettings } from "./settings/fulllook/cms/FullLookNewsSettings";
import { FullLookAdminAQSQuestionSettings } from "./settings/fulllook/aqs/FullLookAQSQuestionSettings";
import { FullLookAdminAQSAnswerSettings } from "./settings/fulllook/aqs/FullLookAQSAnswerSettings";
import { FullLookAdminWalletSettings } from "./settings/fulllook/fee/FullLookWalletSettings";
import { FullLookAdminCouponSettings } from "./settings/fulllook/fee/FullLookCouponSettings";
import { FullLookAdminCouponUserSettings } from "./settings/fulllook/fee/FullLookCouponUserSettings";
import { FullLookAdminOrderCardSettings } from "./settings/fulllook/fee/FullLookOrderCardSettings";
import { FullLookAdminNextNobelsCardSettings } from "./settings/fulllook/fee/FullLookNextNobelsCardSettings";
import { FullLookAdminGameSettings } from "./settings/fulllook/education/game/FullLookGameSettings";
import { FullLookAdminGameTopicSettings } from "./settings/fulllook/education/game/FullLookGameTopicSettings";
import { FullLookAdminGameTypeSettings } from "./settings/fulllook/education/game/FullLookGameTypeSettings";
import { FullLookAdminServicePolicySettings } from "./settings/fulllook/fee/FullLookServicePolicySettings";
import { FullLookAdminMobileCardSettings } from "./settings/fulllook/fee/FullLookMobileCardSettings";
import { FullLookAdminOrderTransactionSettings } from "./settings/fulllook/fee/FullLookOrderTransactionSettings";
import { FullLookAdminThemeSettings } from "./settings/fulllook/FullLookThemeSettings";
import { FullLookAdminLogSettings } from "./settings/fulllook/FullLookLogSettings";
import { FullLookAdminLevelSettings } from "./settings/fulllook/privilege/FullLookAdminLevelSettings";
import { FullLookAdminLevelActionSettings } from "./settings/fulllook/privilege/FullLookAdminLevelActionSettings";
import { getConfigsByHostName } from "./defaultSettings";
import { PmtvAdminTestSettings } from "./settings/pmtv/education/PmtvTestSettings";
import { PmtvAdminCourseSettings } from "./settings/pmtv/education/course/PmtvCourseSettings";
import { PmtvAdminCourseResourceSettings } from "./settings/pmtv/education/course/PmtvCourseResourceSettings";
import { PmtvAdminNewsSettings } from "./settings/pmtv/PmtvNewsSettings";
import { PmtvAdminDocumentSettings } from "./settings/pmtv/education/PmtvDocumentSettings";
import { getSettingsByControllerForQLHS } from "./settings/qlhs";
import { getSettingsByControllerForPMTV } from "./settings/pmtv";

export const getSettingsByController = (controller: string, hostname: string = 'localhost'): TableGridSettings | null => {
    const hostnameConfigs = getConfigsByHostName(hostname);
    console.log('hostnameConfigs.appName', hostname, hostnameConfigs.appName);
    if (hostnameConfigs.appName == 'qlhs') {
        let settings = getSettingsByControllerForQLHS(controller, hostname);
        if (settings) return settings;
    }
    if (hostnameConfigs.appName == 'pmtv') {
        let settings = getSettingsByControllerForPMTV(controller, hostname);
        if (settings) return settings;
    }
    if (controller === "student") {
        return FullLookStudentSettings
    } else if (controller === "user" || controller === "admin_user") {
        return FullLookAdminUserSettings
    } else if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        return FullLookAdminHistoryPaymentSettings;
    } else if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        return FullLookAdminServicePackagesSettings
    } else if (controller === "admin_menu") {
        return FullLookAdminMenuSettings
    } else if (controller === "admin_category") {
        return FullLookAdminCategoriesSettings
    } else if (controller === "admin_question2") {
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
