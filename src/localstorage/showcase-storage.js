import { KEYS, get, set } from '@localstorage';

// ===== КОМАНДЫ SHOWCASE =====
export const getShowcaseTeams = () => {
    const teams = get(KEYS.SHOWCASE);
    return teams || [];
};

export const saveShowcaseTeams = (teams) => {
    return set(KEYS.SHOWCASE, teams);
};

export const addShowcaseTeam = (team) => {
    const teams = getShowcaseTeams();
    const newTeam = {
        ...team,
        id: team.id || Date.now(),
        createdAt: team.createdAt || new Date().toISOString(),
    };
    teams.push(newTeam);
    saveShowcaseTeams(teams);
    return newTeam;
};

export const updateShowcaseTeam = (teamId, updates) => {
    const teams = getShowcaseTeams();
    const index = teams.findIndex(t => t.id === teamId);
    if (index !== -1) {
        teams[index] = {
            ...teams[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        saveShowcaseTeams(teams);
        return teams[index];
    }
    return null;
};

export const deleteShowcaseTeam = (teamId) => {
    const teams = getShowcaseTeams();
    const filtered = teams.filter(t => t.id !== teamId);
    saveShowcaseTeams(filtered);
    return filtered;
};

export const getShowcaseTeamById = (teamId) => {
    const teams = getShowcaseTeams();
    return teams.find(t => t.id === teamId) || null;
};

export const getShowcaseTeamByIndex = (index) => {
    const teams = getShowcaseTeams();
    return teams[index] || null;
};

export const clearAllShowcaseTeams = () => {
    return set(KEYS.SHOWCASE, []);
};

// ===== СОЗДАНИЕ ДЕФОЛТНОЙ КОМАНДЫ =====
export const createDefaultTeam = (name = 'Team 1') => {
    return {
        id: Date.now(),
        name: name,
        selectedCompanion: null,
        selectedMCWeapon: null,
        solarCards: [null, null],
        lunarCards: [null, null, null, null],
        affinityLevel: 0,
        createdAt: new Date().toISOString(),
    };
};

// ===== ПОЛУЧЕНИЕ КОМАНДЫ С ДЕФОЛТНЫМ ЗНАЧЕНИЕМ =====
export const getShowcaseTeamsOrDefault = () => {
    const teams = getShowcaseTeams();
    if (teams && teams.length > 0) {
        return teams;
    }
    return [createDefaultTeam()];
};