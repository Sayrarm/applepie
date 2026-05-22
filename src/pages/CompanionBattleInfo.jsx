import CompanionArticlePage from '../components/CompanionArticlePage';
import { compData } from '../data/comp-data.js';

function CompanionBattleInfo() {
    return (
        <CompanionArticlePage
            data={compData}
            linkField="link"
        />
    );
}

export default CompanionBattleInfo;