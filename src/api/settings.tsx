import { TableGridSettings } from "@/components/grid/TableGrid";
import { StudentSettings } from "./settings/StudentSettings";
import { AdminUserSettings } from "./settings/UserSettings";
import { AdminCategoriesSettings } from "./settings/CategoriesSettings";
import { AdminQuestionSettings } from "./settings/QuestionSettings";
import { AdminServicePackagesSettings } from "./settings/ServicePackagesSettings";
import { AdminTestSettings } from "./settings/TestSettings";
import { AdminHistoryPaymentSettings } from "./settings/HistoryPaymentSettings";
import { AdminMenuSettings } from "./settings/MenuSettings";
import { AdminDocumentSettings } from "./settings/DocumentSettings";
import { AdminBookSettings } from "./settings/BookSettings";
import { AdminContestSettings } from "./settings/ContestSettings";
import { AdminQuestionErrorSettings } from "./settings/QuestionErrorSettings";
import { AdminVoteSettings } from "./settings/VoteSettings";
import { AdminBannerSettings } from "./settings/BannerSettings";
import { AdminMediaSettings } from "./settings/MediaSettings";
import { AdminNewsSettings } from "./settings/NewsSettings";
import { AdminAQSQuestionSettings } from "./settings/AQSQuestionSettings";
import { AdminAQSAnswerSettings } from "./settings/AQSAnswerSettings";
import { AdminWalletSettings } from "./settings/WalletSettings";
import { AdminCouponSettings } from "./settings/CouponSettings";
import { AdminCouponUserSettings } from "./settings/CouponUserSettings";
import { AdminOrderCardSettings } from "./settings/OrderCardSettings";
import { AdminNextNobelsCardSettings } from "./settings/NextNobelsCardSettings";

export const getSettingsByController = (controller: string): TableGridSettings | null => {
    if (controller === "student") {
        return StudentSettings
    } else if (controller === "user" || controller === "admin_user") {
        return AdminUserSettings
    } else if (controller === "history_payment" || controller === "admin_payment_historypayment") {
        return AdminHistoryPaymentSettings
    } else if (controller === "service_packages" || controller === "admin_service_servicepackages") {
        return AdminServicePackagesSettings
    } else if (controller === "admin_menu") {
        return AdminMenuSettings
    } else if (controller === "admin_category") {
        return AdminCategoriesSettings
    } else if (controller === "admin_question2") {
        return AdminQuestionSettings
    } else if (controller === "admin_document") {
        return AdminDocumentSettings
    } else if (controller === "admin_test") {
        return AdminTestSettings
    } else if (controller === "admin_book") {
        return AdminBookSettings
    } else if (controller === "admin_contest") {
        return AdminContestSettings
    } else if (controller === "admin_questionerror") {
        return AdminQuestionErrorSettings
    } else if (controller === "admin_vote") {
        return AdminVoteSettings
    } else if (controller === "admin_banner") {
        return AdminBannerSettings
    } else if (controller === "admin_media") {
        return AdminMediaSettings
    } else if (controller === "admin_news") {
        return AdminNewsSettings
    } else if (controller === "admin_aqsquestion") {
        return AdminAQSQuestionSettings
    } else if (controller === "admin_aqsanswer") {
        return AdminAQSAnswerSettings
    } else if (controller === "admin_wallets") {
        return AdminWalletSettings
    } else if (controller === "admin_coupon") {
        return AdminCouponSettings
    } else if (controller === "admin_coupon_user") {
        return AdminCouponUserSettings
    } else if (controller === "admin_ordercard") {
        return AdminOrderCardSettings
    } else if (controller === "admin_service_cardnexnobels") {
        return AdminNextNobelsCardSettings
    }
    return null;
}