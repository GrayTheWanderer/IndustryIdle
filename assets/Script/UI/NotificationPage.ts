import { G } from "../General/GameData";
import { t } from "../General/i18n";
import { leftOrRight, uiHeaderActionBack } from "./UIHelper";
import { toastLog } from "./UISystem";

export function NotificationPage(): m.Component {
    return {
        onbeforeupdate: () => false,
        view: () => {
            return m(".modal", { class: leftOrRight() }, [
                uiHeaderActionBack(t("NotificationLog"), () => G.world.routeTo(G.headquarter.grid)),
                m(".scrollable", [
                    // Make shallow copy of toastLog then invoke reverse followed by map (in order to iterate from newest to oldest)
                    // Doing so modifies the shallow copy not the original array (toastLog). 
                    toastLog.slice(0).reverse().map((v) => {
                        return m(".box", [
                            m(".title", {style: "text-align: right;"}, (new Date(v.timestamp).toLocaleDateString())+" @ "+(new Date(v.timestamp).toLocaleTimeString())),
                            m(".hr"),
                            m(".text-m.text-desc", v.msg)
                        ]);
                    }),
                ]),
            ]);
        },
    };
}