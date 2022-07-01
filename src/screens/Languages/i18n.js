import i18next, { loadLanguages } from "i18next";
import english from './english.json';
import turkce from './turkce.json';
import deutsch from './deutsch.json';
import { initReactI18next } from "react-i18next";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

/*const languageDetector = {
        type: 'languageDetector',
        async: true,
        detect:(callback)=>{
            return callback(RNLocalize.getLocales()[0].languageCode);
        },
        init:()=>{},
        cacheUserLanguage:() => {},
};*/

i18next.use(RNLanguageDetector).use(initReactI18next).init({
    compatibilityJSON: 'v3',
        fallbackLng:'tr',
        resources:{
            tr:turkce,
            en:english,
            de:deutsch
        },
        supportedLngs:['tr', 'en' , 'de'],
        ns: [],
        defaultNS:undefined,
        interpolation:{
            escapeValue:false,
        },
        /*react:{
            useSuspense:false,
        },*/

});

export default i18next;