const envData = $('body').data()

/* es6 destructuring, takes property names from $data object, assigns them to
uppercase variables, and exports them all in one go */
export const {
  servicebase: SERVICE_BASE,
  companyUuid: COMPANY_UUID,
  clienttoken: AGENT_UUID,
  agentDomain: AGENT_DOMAIN,
  agentSiteType: AGENT_SITE_TYPE,
  acombase: ACOM_DOMAIN,
  environment: ENVIRONMENT
} = envData

/* this is set to '' in dev so that the webpack proxyTable config in config/index.js works correctly. set
data-node-environment to 'development' if you want to run QA locally in dev and have this still work right. we're
keeping ROSTER_SERVICE_BASE around for prod, even though it's not necessary, just in case it would be useful to change
that value to something besides the actual Roster in the future. */
// export const ROSTER_SERVICE_BASE = (
//   envData.environment === 'development' || envData.nodeEnvironment === 'development'
// ) ? '' : envData.rosterservicebase

export const ROSTER_SERVICE_BASE = envData.rosterservicebase
