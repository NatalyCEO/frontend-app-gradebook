import arMessages from './messages/ar.json';
// no need to import en messages-- they are in the defaultMessage field
import es419Messages from './messages/es_419.json';
import esEsMessages from './messages/es_es.json';
import frMessages from './messages/fr.json';
import ptbrMessages from './messages/pt_br.json';
import ptPtMessages from './messages/pt_pt.json';
import ruMessages from './messages/ru.json';
import zhcnMessages from './messages/zh_CN.json';

const messages = {
  ar: arMessages,
  'es-419': es419Messages,
  es: esEsMessages,
  'es-es': esEsMessages, // legacy cookie alias
  fr: frMessages,
  'pt-br': ptbrMessages,
  pt: ptPtMessages,
  'pt-pt': ptPtMessages, // legacy cookie alias
  ru: ruMessages,
  'zh-cn': zhcnMessages,
};

export default messages;
