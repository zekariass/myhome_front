export const COMPANY_NAME = "Grinmove";
export const API_CALL_TIME_OUT = 3000;

//PATHS

//AUTH
export const PATH_SIGNIN = "/signin";
export const PATH_SIGNUP = "/signup";
export const PATH_SAVED_PROPETRTIES = "/your-saved-properties";
export const PATH_ADD_PROPERTY = "/list-your-property";
export const PATH_LANDING = "/";
export const PATH_PAGE_NOT_FOUND = "*";

//AGENTs
export const PATH_AGENTS_HOME = "/agents";
export const PATH_AGENTS_SEARCH = "search";
export const PATH_AGENTS_SEARCH_ABSOLUTE = `${PATH_AGENTS_HOME}/${PATH_AGENTS_SEARCH}`;
export const PATH_AGENTS_LIST = "list";
export const PATH_AGENTS_LIST_ABSOLUTE = `${PATH_AGENTS_HOME}/${PATH_AGENTS_LIST}`;
export const PATH_AGENTS_ADD = "add";
export const PATH_AGENTS_ADD_ABSOLUTE = `${PATH_AGENTS_HOME}/${PATH_AGENTS_ADD}`;
export const PATH_AGENT_CREATE_INFO = "info";
export const PATH_AGENT_CREATE_INFO_ABSOLUTE = `${PATH_AGENTS_HOME}/${PATH_AGENT_CREATE_INFO}`;
export const PATH_AGENT_LOGO_UPLOAD = "logo/upload";
export const PATH_AGENT_LOGO_UPLOAD_ABSOLUTE = `${PATH_AGENTS_HOME}/${PATH_AGENT_LOGO_UPLOAD}`;
export const PATH_AGENT_DASHBOARD = "dashboard";
export const PATH_AGENT_DASHBOARD_ABSOLUTE = `${PATH_AGENTS_HOME}/${PATH_AGENT_DASHBOARD}`;

//PROPERTIES
export const PATH_PROPERTY_HOME = "/property";
export const PATH_PROPERTY_ADD = "add";
export const PATH_PROPERTY_ADD_ABSOLUTE = `${PATH_PROPERTY_HOME}/${PATH_PROPERTY_ADD}`;
export const PATH_PROPERTY_FILE_UPLOAD = "file/upload";
export const PATH_PROPERTY_FILE_UPLOAD_ABSOLUTE = `${PATH_PROPERTY_HOME}/${PATH_PROPERTY_FILE_UPLOAD}`;

//PROPERTY CATEGORY KEYS< USED FOR BACKEND AND FRONTEND SYNCHRONIZATION
export const APARTMENT_KEY = "CAT001";
export const CONDOMINIUM_KEY = "CAT002";
export const TRADITIONAL_HOUSE_KEY = "CAT003";
export const VILLA_KEY = "CAT004";
export const SHARE_HOUSE_KEY = "CAT005";
export const COMMERCIAL_PROPERTY_KEY = "CAT006";
export const OFFICE_KEY = "CAT007";
export const HALL_KEY = "CAT008";
export const LAND_KEY = "CAT009";
export const ALL_PURPOSE_PROPERTY_KEY = "CAT010";
