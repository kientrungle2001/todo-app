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

export const getSettingsByController = (controller: string): TableGridSettings | null => {
    if (controller === "student") {
        return FullLookStudentSettings
    } else if (controller === "user" || controller === "admin_user") {
        return FullLookAdminUserSettings
    } else if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        return FullLookAdminHistoryPaymentSettings
    } else if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        return FullLookAdminServicePackagesSettings
    } else if (controller === "admin_menu") {
        return FullLookAdminMenuSettings
    } else if (controller === "admin_category") {
        return FullLookAdminCategoriesSettings
    } else if (controller === "admin_question2") {
        return FullLookAdminQuestionSettings
    } else if (controller === "admin_document") {
        return FullLookAdminDocumentSettings
    } else if (controller === "admin_test") {
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
    }
    return null;
}