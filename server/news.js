const NEWS1 = {
  title: '東京オリンピックまであとXX日',
  summary: '東京オリンピックまであとXX日を切った。オリンピック商戦の追い込みに向けて、各所が動きはじめている。',
  date: new Date(2019, 4, 12, 14),
};

const NEWS2 = {
  title: '注目の武将、明智光秀とは',
  summary: '来年度の国民的時代劇の主人公は、明智光秀。三日天下、裏切り者等どちらかといえば悪いイメージの方が多いが、そのさえ除外すれば意外と主人公の条件を備えている。',
  date: new Date(2019, 1, 1, 13),
};

const NEWS3 = {
  title: '上野に西郷隆盛像がある理由',
  summary: '西郷隆盛といえば、鹿児島が生んだ英雄。故郷の鹿児島に像があるのは分かるが、西郷さんと上野公園は深い関係があるのだろうか。',
  date: new Date(2019, 5, 1, 10),
};

const NEWS4 = {
  title: '紀尾井町、西郷隆盛の盟友と宿敵のゆかりの地だった',
  summary: '紀尾井町と西郷隆盛には、意外と知られていない深い関係があった。',
  date: new Date(2019, 3, 4, 13),
};

const NEWS5 = {
  title: '池上、田町のつながりとは',
  summary: '池上と田町。一見関係なさそうに見える組み合わせだが、実はこの2つは江戸城無血開城の階段場所になったつながりがあるのだ。',
  date: new Date(2019, 1, 1, 10),
};

/** ランダムでニュースを生成する */
function generateNews() {
  const group = Math.round(Math.random() * 4);
  switch (group) {
    case 0:
      return [NEWS1, NEWS2, NEWS3];
    case 1:
      return [NEWS4, NEWS5];
    case 2:
      return [NEWS1, NEWS5, NEWS3];
    case 3:
      return [NEWS5, NEWS1, NEWS3, NEWS2];
    case 4:
      return [NEWS2];
    default:
      return [NEWS1, NEWS2, NEWS3, NEWS4, NEWS5];
  }
}

module.exports = {
  generateNews: generateNews
};
