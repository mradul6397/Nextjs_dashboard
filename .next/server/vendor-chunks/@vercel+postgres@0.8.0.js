"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@vercel+postgres@0.8.0";
exports.ids = ["vendor-chunks/@vercel+postgres@0.8.0"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@vercel+postgres@0.8.0/node_modules/@vercel/postgres/dist/chunk-WDBQYBZQ.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@vercel+postgres@0.8.0/node_modules/@vercel/postgres/dist/chunk-WDBQYBZQ.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   VercelClient: () => (/* binding */ VercelClient),\n/* harmony export */   VercelPool: () => (/* binding */ VercelPool),\n/* harmony export */   createClient: () => (/* binding */ createClient),\n/* harmony export */   createPool: () => (/* binding */ createPool),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   postgresConnectionString: () => (/* binding */ postgresConnectionString),\n/* harmony export */   sql: () => (/* binding */ sql),\n/* harmony export */   types: () => (/* reexport safe */ _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.types)\n/* harmony export */ });\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/.pnpm/@neondatabase+serverless@0.7.2/node_modules/@neondatabase/serverless/index.mjs\");\n// src/create-pool.ts\n\n\n// src/error.ts\nvar VercelPostgresError = class extends Error {\n  constructor(code, message) {\n    super(`VercelPostgresError - '${code}': ${message}`);\n    this.code = code;\n    this.name = \"VercelPostgresError\";\n  }\n};\n\n// src/postgres-connection-string.ts\nfunction postgresConnectionString(type = \"pool\") {\n  let connectionString;\n  switch (type) {\n    case \"pool\": {\n      connectionString = process.env.POSTGRES_URL;\n      break;\n    }\n    case \"direct\": {\n      connectionString = process.env.POSTGRES_URL_NON_POOLING;\n      break;\n    }\n    default: {\n      const _exhaustiveCheck = type;\n      const str = _exhaustiveCheck;\n      throw new VercelPostgresError(\n        \"invalid_connection_type\",\n        `Unhandled type: ${str}`\n      );\n    }\n  }\n  if (connectionString === \"undefined\")\n    connectionString = void 0;\n  return connectionString;\n}\nfunction isPooledConnectionString(connectionString) {\n  return connectionString.includes(\"-pooler.\");\n}\nfunction isDirectConnectionString(connectionString) {\n  return !isPooledConnectionString(connectionString);\n}\nfunction isLocalhostConnectionString(connectionString) {\n  try {\n    const withHttpsProtocol = connectionString.replace(\n      /^postgresql:\\/\\//,\n      \"https://\"\n    );\n    return new URL(withHttpsProtocol).hostname === \"localhost\";\n  } catch (err) {\n    if (err instanceof TypeError) {\n      return false;\n    }\n    if (typeof err === \"object\" && err !== null && \"message\" in err && typeof err.message === \"string\" && err.message === \"Invalid URL\") {\n      return false;\n    }\n    throw err;\n  }\n}\n\n// src/sql-template.ts\nfunction sqlTemplate(strings, ...values) {\n  var _a, _b;\n  if (!isTemplateStringsArray(strings) || !Array.isArray(values)) {\n    throw new VercelPostgresError(\n      \"incorrect_tagged_template_call\",\n      \"It looks like you tried to call `sql` as a function. Make sure to use it as a tagged template.\\n\tExample: sql`SELECT * FROM users`, not sql('SELECT * FROM users')\"\n    );\n  }\n  let result = (_a = strings[0]) != null ? _a : \"\";\n  for (let i = 1; i < strings.length; i++) {\n    result += `$${i}${(_b = strings[i]) != null ? _b : \"\"}`;\n  }\n  return [result, values];\n}\nfunction isTemplateStringsArray(strings) {\n  return Array.isArray(strings) && \"raw\" in strings && Array.isArray(strings.raw);\n}\n\n// src/create-client.ts\n\nvar VercelClient = class extends _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.Client {\n  /**\n   * A template literal tag providing safe, easy to use SQL parameterization.\n   * Parameters are substituted using the underlying Postgres database, and so must follow\n   * the rules of Postgres parameterization.\n   * @example\n   * ```ts\n   * const pool = createClient();\n   * const userId = 123;\n   * await client.connect();\n   * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;\n   * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);\n   * await client.end();\n   * ```\n   * @returns A promise that resolves to the query result.\n   */\n  async sql(strings, ...values) {\n    const [query, params] = sqlTemplate(strings, ...values);\n    return this.query(query, params);\n  }\n};\nfunction createClient(config) {\n  var _a;\n  const connectionString = (_a = config == null ? void 0 : config.connectionString) != null ? _a : postgresConnectionString(\"direct\");\n  if (!connectionString)\n    throw new VercelPostgresError(\n      \"missing_connection_string\",\n      \"You did not supply a 'connectionString' and no 'POSTGRES_URL_NON_POOLING' env var was found.\"\n    );\n  if (!isLocalhostConnectionString(connectionString) && !isDirectConnectionString(connectionString))\n    throw new VercelPostgresError(\n      \"invalid_connection_string\",\n      \"This connection string is meant to be used with a pooled connection. Try `createPool()` instead.\"\n    );\n  return new VercelClient({\n    ...config,\n    connectionString\n  });\n}\n\n// src/create-pool.ts\nvar VercelPool = class extends _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.Pool {\n  constructor(config) {\n    var _a;\n    super(config);\n    this.Client = VercelClient;\n    this.connectionString = (_a = config.connectionString) != null ? _a : \"\";\n  }\n  /**\n   * A template literal tag providing safe, easy to use SQL parameterization.\n   * Parameters are substituted using the underlying Postgres database, and so must follow\n   * the rules of Postgres parameterization.\n   * @example\n   * ```ts\n   * const pool = createPool();\n   * const userId = 123;\n   * const result = await pool.sql`SELECT * FROM users WHERE id = ${userId}`;\n   * // Equivalent to: await pool.query('SELECT * FROM users WHERE id = $1', [id]);\n   * ```\n   * @returns A promise that resolves to the query result.\n   */\n  async sql(strings, ...values) {\n    const [query, params] = sqlTemplate(strings, ...values);\n    const sql2 = (0,_neondatabase_serverless__WEBPACK_IMPORTED_MODULE_0__.neon)(this.connectionString, {\n      fullResults: true\n    });\n    return sql2(query, params);\n  }\n  connect(callback) {\n    return super.connect(\n      callback\n    );\n  }\n};\nfunction createPool(config) {\n  var _a;\n  const connectionString = (_a = config == null ? void 0 : config.connectionString) != null ? _a : postgresConnectionString(\"pool\");\n  if (!connectionString)\n    throw new VercelPostgresError(\n      \"missing_connection_string\",\n      \"You did not supply a 'connectionString' and no 'POSTGRES_URL' env var was found.\"\n    );\n  if (!isLocalhostConnectionString(connectionString) && !isPooledConnectionString(connectionString))\n    throw new VercelPostgresError(\n      \"invalid_connection_string\",\n      \"This connection string is meant to be used with a direct connection. Make sure to use a pooled connection string or try `createClient()` instead.\"\n    );\n  let maxUses = config == null ? void 0 : config.maxUses;\n  let max = config == null ? void 0 : config.max;\n  if (typeof EdgeRuntime !== \"undefined\") {\n    if (maxUses && maxUses !== 1) {\n      console.warn(\n        \"@vercel/postgres: Overriding `maxUses` to 1 because the EdgeRuntime does not support client reuse.\"\n      );\n    }\n    if (max && max !== 1e4) {\n      console.warn(\n        \"@vercel/postgres: Overriding `max` to 10,000 because the EdgeRuntime does not support client reuse.\"\n      );\n    }\n    maxUses = 1;\n    max = 1e4;\n  }\n  const pool2 = new VercelPool({\n    ...config,\n    connectionString,\n    maxUses,\n    max\n  });\n  return pool2;\n}\n\n// src/index.ts\n\nvar pool;\nvar sql = new Proxy(\n  // eslint-disable-next-line @typescript-eslint/no-empty-function -- [@vercel/style-guide@5 migration]\n  () => {\n  },\n  {\n    get(_, prop) {\n      if (!pool) {\n        pool = createPool();\n      }\n      const val = Reflect.get(pool, prop);\n      if (typeof val === \"function\") {\n        return val.bind(pool);\n      }\n      return val;\n    },\n    apply(_, __, argumentsList) {\n      if (!pool) {\n        pool = createPool();\n      }\n      return pool.sql(...argumentsList);\n    }\n  }\n);\nvar db = sql;\n\n\n//# sourceMappingURL=chunk-WDBQYBZQ.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHZlcmNlbCtwb3N0Z3Jlc0AwLjguMC9ub2RlX21vZHVsZXMvQHZlcmNlbC9wb3N0Z3Jlcy9kaXN0L2NodW5rLVdEQlFZQlpRLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ3NEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSyxLQUFLLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixJQUFJO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QyxrQkFBa0IsRUFBRSxFQUFFLG9DQUFvQztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDa0Q7QUFDbEQsaUNBQWlDLDREQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxPQUFPO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQSwrQkFBK0IsMERBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxPQUFPO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw4REFBSTtBQUNyQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBV0U7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy8ucG5wbS9AdmVyY2VsK3Bvc3RncmVzQDAuOC4wL25vZGVfbW9kdWxlcy9AdmVyY2VsL3Bvc3RncmVzL2Rpc3QvY2h1bmstV0RCUVlCWlEuanM/N2YxNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzcmMvY3JlYXRlLXBvb2wudHNcbmltcG9ydCB7IFBvb2wsIG5lb24gfSBmcm9tIFwiQG5lb25kYXRhYmFzZS9zZXJ2ZXJsZXNzXCI7XG5cbi8vIHNyYy9lcnJvci50c1xudmFyIFZlcmNlbFBvc3RncmVzRXJyb3IgPSBjbGFzcyBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoY29kZSwgbWVzc2FnZSkge1xuICAgIHN1cGVyKGBWZXJjZWxQb3N0Z3Jlc0Vycm9yIC0gJyR7Y29kZX0nOiAke21lc3NhZ2V9YCk7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICB0aGlzLm5hbWUgPSBcIlZlcmNlbFBvc3RncmVzRXJyb3JcIjtcbiAgfVxufTtcblxuLy8gc3JjL3Bvc3RncmVzLWNvbm5lY3Rpb24tc3RyaW5nLnRzXG5mdW5jdGlvbiBwb3N0Z3Jlc0Nvbm5lY3Rpb25TdHJpbmcodHlwZSA9IFwicG9vbFwiKSB7XG4gIGxldCBjb25uZWN0aW9uU3RyaW5nO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFwicG9vbFwiOiB7XG4gICAgICBjb25uZWN0aW9uU3RyaW5nID0gcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJkaXJlY3RcIjoge1xuICAgICAgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52LlBPU1RHUkVTX1VSTF9OT05fUE9PTElORztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICBjb25zdCBfZXhoYXVzdGl2ZUNoZWNrID0gdHlwZTtcbiAgICAgIGNvbnN0IHN0ciA9IF9leGhhdXN0aXZlQ2hlY2s7XG4gICAgICB0aHJvdyBuZXcgVmVyY2VsUG9zdGdyZXNFcnJvcihcbiAgICAgICAgXCJpbnZhbGlkX2Nvbm5lY3Rpb25fdHlwZVwiLFxuICAgICAgICBgVW5oYW5kbGVkIHR5cGU6ICR7c3RyfWBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlmIChjb25uZWN0aW9uU3RyaW5nID09PSBcInVuZGVmaW5lZFwiKVxuICAgIGNvbm5lY3Rpb25TdHJpbmcgPSB2b2lkIDA7XG4gIHJldHVybiBjb25uZWN0aW9uU3RyaW5nO1xufVxuZnVuY3Rpb24gaXNQb29sZWRDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpIHtcbiAgcmV0dXJuIGNvbm5lY3Rpb25TdHJpbmcuaW5jbHVkZXMoXCItcG9vbGVyLlwiKTtcbn1cbmZ1bmN0aW9uIGlzRGlyZWN0Q29ubmVjdGlvblN0cmluZyhjb25uZWN0aW9uU3RyaW5nKSB7XG4gIHJldHVybiAhaXNQb29sZWRDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpO1xufVxuZnVuY3Rpb24gaXNMb2NhbGhvc3RDb25uZWN0aW9uU3RyaW5nKGNvbm5lY3Rpb25TdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB3aXRoSHR0cHNQcm90b2NvbCA9IGNvbm5lY3Rpb25TdHJpbmcucmVwbGFjZShcbiAgICAgIC9ecG9zdGdyZXNxbDpcXC9cXC8vLFxuICAgICAgXCJodHRwczovL1wiXG4gICAgKTtcbiAgICByZXR1cm4gbmV3IFVSTCh3aXRoSHR0cHNQcm90b2NvbCkuaG9zdG5hbWUgPT09IFwibG9jYWxob3N0XCI7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBUeXBlRXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlcnIgPT09IFwib2JqZWN0XCIgJiYgZXJyICE9PSBudWxsICYmIFwibWVzc2FnZVwiIGluIGVyciAmJiB0eXBlb2YgZXJyLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIgJiYgZXJyLm1lc3NhZ2UgPT09IFwiSW52YWxpZCBVUkxcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuLy8gc3JjL3NxbC10ZW1wbGF0ZS50c1xuZnVuY3Rpb24gc3FsVGVtcGxhdGUoc3RyaW5ncywgLi4udmFsdWVzKSB7XG4gIHZhciBfYSwgX2I7XG4gIGlmICghaXNUZW1wbGF0ZVN0cmluZ3NBcnJheShzdHJpbmdzKSB8fCAhQXJyYXkuaXNBcnJheSh2YWx1ZXMpKSB7XG4gICAgdGhyb3cgbmV3IFZlcmNlbFBvc3RncmVzRXJyb3IoXG4gICAgICBcImluY29ycmVjdF90YWdnZWRfdGVtcGxhdGVfY2FsbFwiLFxuICAgICAgXCJJdCBsb29rcyBsaWtlIHlvdSB0cmllZCB0byBjYWxsIGBzcWxgIGFzIGEgZnVuY3Rpb24uIE1ha2Ugc3VyZSB0byB1c2UgaXQgYXMgYSB0YWdnZWQgdGVtcGxhdGUuXFxuXHRFeGFtcGxlOiBzcWxgU0VMRUNUICogRlJPTSB1c2Vyc2AsIG5vdCBzcWwoJ1NFTEVDVCAqIEZST00gdXNlcnMnKVwiXG4gICAgKTtcbiAgfVxuICBsZXQgcmVzdWx0ID0gKF9hID0gc3RyaW5nc1swXSkgIT0gbnVsbCA/IF9hIDogXCJcIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IGAkJHtpfSR7KF9iID0gc3RyaW5nc1tpXSkgIT0gbnVsbCA/IF9iIDogXCJcIn1gO1xuICB9XG4gIHJldHVybiBbcmVzdWx0LCB2YWx1ZXNdO1xufVxuZnVuY3Rpb24gaXNUZW1wbGF0ZVN0cmluZ3NBcnJheShzdHJpbmdzKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHN0cmluZ3MpICYmIFwicmF3XCIgaW4gc3RyaW5ncyAmJiBBcnJheS5pc0FycmF5KHN0cmluZ3MucmF3KTtcbn1cblxuLy8gc3JjL2NyZWF0ZS1jbGllbnQudHNcbmltcG9ydCB7IENsaWVudCB9IGZyb20gXCJAbmVvbmRhdGFiYXNlL3NlcnZlcmxlc3NcIjtcbnZhciBWZXJjZWxDbGllbnQgPSBjbGFzcyBleHRlbmRzIENsaWVudCB7XG4gIC8qKlxuICAgKiBBIHRlbXBsYXRlIGxpdGVyYWwgdGFnIHByb3ZpZGluZyBzYWZlLCBlYXN5IHRvIHVzZSBTUUwgcGFyYW1ldGVyaXphdGlvbi5cbiAgICogUGFyYW1ldGVycyBhcmUgc3Vic3RpdHV0ZWQgdXNpbmcgdGhlIHVuZGVybHlpbmcgUG9zdGdyZXMgZGF0YWJhc2UsIGFuZCBzbyBtdXN0IGZvbGxvd1xuICAgKiB0aGUgcnVsZXMgb2YgUG9zdGdyZXMgcGFyYW1ldGVyaXphdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3QgcG9vbCA9IGNyZWF0ZUNsaWVudCgpO1xuICAgKiBjb25zdCB1c2VySWQgPSAxMjM7XG4gICAqIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XG4gICAqIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBvb2wuc3FsYFNFTEVDVCAqIEZST00gdXNlcnMgV0hFUkUgaWQgPSAke3VzZXJJZH1gO1xuICAgKiAvLyBFcXVpdmFsZW50IHRvOiBhd2FpdCBwb29sLnF1ZXJ5KCdTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gJDEnLCBbaWRdKTtcbiAgICogYXdhaXQgY2xpZW50LmVuZCgpO1xuICAgKiBgYGBcbiAgICogQHJldHVybnMgQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gdGhlIHF1ZXJ5IHJlc3VsdC5cbiAgICovXG4gIGFzeW5jIHNxbChzdHJpbmdzLCAuLi52YWx1ZXMpIHtcbiAgICBjb25zdCBbcXVlcnksIHBhcmFtc10gPSBzcWxUZW1wbGF0ZShzdHJpbmdzLCAuLi52YWx1ZXMpO1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5KHF1ZXJ5LCBwYXJhbXMpO1xuICB9XG59O1xuZnVuY3Rpb24gY3JlYXRlQ2xpZW50KGNvbmZpZykge1xuICB2YXIgX2E7XG4gIGNvbnN0IGNvbm5lY3Rpb25TdHJpbmcgPSAoX2EgPSBjb25maWcgPT0gbnVsbCA/IHZvaWQgMCA6IGNvbmZpZy5jb25uZWN0aW9uU3RyaW5nKSAhPSBudWxsID8gX2EgOiBwb3N0Z3Jlc0Nvbm5lY3Rpb25TdHJpbmcoXCJkaXJlY3RcIik7XG4gIGlmICghY29ubmVjdGlvblN0cmluZylcbiAgICB0aHJvdyBuZXcgVmVyY2VsUG9zdGdyZXNFcnJvcihcbiAgICAgIFwibWlzc2luZ19jb25uZWN0aW9uX3N0cmluZ1wiLFxuICAgICAgXCJZb3UgZGlkIG5vdCBzdXBwbHkgYSAnY29ubmVjdGlvblN0cmluZycgYW5kIG5vICdQT1NUR1JFU19VUkxfTk9OX1BPT0xJTkcnIGVudiB2YXIgd2FzIGZvdW5kLlwiXG4gICAgKTtcbiAgaWYgKCFpc0xvY2FsaG9zdENvbm5lY3Rpb25TdHJpbmcoY29ubmVjdGlvblN0cmluZykgJiYgIWlzRGlyZWN0Q29ubmVjdGlvblN0cmluZyhjb25uZWN0aW9uU3RyaW5nKSlcbiAgICB0aHJvdyBuZXcgVmVyY2VsUG9zdGdyZXNFcnJvcihcbiAgICAgIFwiaW52YWxpZF9jb25uZWN0aW9uX3N0cmluZ1wiLFxuICAgICAgXCJUaGlzIGNvbm5lY3Rpb24gc3RyaW5nIGlzIG1lYW50IHRvIGJlIHVzZWQgd2l0aCBhIHBvb2xlZCBjb25uZWN0aW9uLiBUcnkgYGNyZWF0ZVBvb2woKWAgaW5zdGVhZC5cIlxuICAgICk7XG4gIHJldHVybiBuZXcgVmVyY2VsQ2xpZW50KHtcbiAgICAuLi5jb25maWcsXG4gICAgY29ubmVjdGlvblN0cmluZ1xuICB9KTtcbn1cblxuLy8gc3JjL2NyZWF0ZS1wb29sLnRzXG52YXIgVmVyY2VsUG9vbCA9IGNsYXNzIGV4dGVuZHMgUG9vbCB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHZhciBfYTtcbiAgICBzdXBlcihjb25maWcpO1xuICAgIHRoaXMuQ2xpZW50ID0gVmVyY2VsQ2xpZW50O1xuICAgIHRoaXMuY29ubmVjdGlvblN0cmluZyA9IChfYSA9IGNvbmZpZy5jb25uZWN0aW9uU3RyaW5nKSAhPSBudWxsID8gX2EgOiBcIlwiO1xuICB9XG4gIC8qKlxuICAgKiBBIHRlbXBsYXRlIGxpdGVyYWwgdGFnIHByb3ZpZGluZyBzYWZlLCBlYXN5IHRvIHVzZSBTUUwgcGFyYW1ldGVyaXphdGlvbi5cbiAgICogUGFyYW1ldGVycyBhcmUgc3Vic3RpdHV0ZWQgdXNpbmcgdGhlIHVuZGVybHlpbmcgUG9zdGdyZXMgZGF0YWJhc2UsIGFuZCBzbyBtdXN0IGZvbGxvd1xuICAgKiB0aGUgcnVsZXMgb2YgUG9zdGdyZXMgcGFyYW1ldGVyaXphdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHNcbiAgICogY29uc3QgcG9vbCA9IGNyZWF0ZVBvb2woKTtcbiAgICogY29uc3QgdXNlcklkID0gMTIzO1xuICAgKiBjb25zdCByZXN1bHQgPSBhd2FpdCBwb29sLnNxbGBTRUxFQ1QgKiBGUk9NIHVzZXJzIFdIRVJFIGlkID0gJHt1c2VySWR9YDtcbiAgICogLy8gRXF1aXZhbGVudCB0bzogYXdhaXQgcG9vbC5xdWVyeSgnU0VMRUNUICogRlJPTSB1c2VycyBXSEVSRSBpZCA9ICQxJywgW2lkXSk7XG4gICAqIGBgYFxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgcXVlcnkgcmVzdWx0LlxuICAgKi9cbiAgYXN5bmMgc3FsKHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICAgIGNvbnN0IFtxdWVyeSwgcGFyYW1zXSA9IHNxbFRlbXBsYXRlKHN0cmluZ3MsIC4uLnZhbHVlcyk7XG4gICAgY29uc3Qgc3FsMiA9IG5lb24odGhpcy5jb25uZWN0aW9uU3RyaW5nLCB7XG4gICAgICBmdWxsUmVzdWx0czogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBzcWwyKHF1ZXJ5LCBwYXJhbXMpO1xuICB9XG4gIGNvbm5lY3QoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gc3VwZXIuY29ubmVjdChcbiAgICAgIGNhbGxiYWNrXG4gICAgKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZVBvb2woY29uZmlnKSB7XG4gIHZhciBfYTtcbiAgY29uc3QgY29ubmVjdGlvblN0cmluZyA9IChfYSA9IGNvbmZpZyA9PSBudWxsID8gdm9pZCAwIDogY29uZmlnLmNvbm5lY3Rpb25TdHJpbmcpICE9IG51bGwgPyBfYSA6IHBvc3RncmVzQ29ubmVjdGlvblN0cmluZyhcInBvb2xcIik7XG4gIGlmICghY29ubmVjdGlvblN0cmluZylcbiAgICB0aHJvdyBuZXcgVmVyY2VsUG9zdGdyZXNFcnJvcihcbiAgICAgIFwibWlzc2luZ19jb25uZWN0aW9uX3N0cmluZ1wiLFxuICAgICAgXCJZb3UgZGlkIG5vdCBzdXBwbHkgYSAnY29ubmVjdGlvblN0cmluZycgYW5kIG5vICdQT1NUR1JFU19VUkwnIGVudiB2YXIgd2FzIGZvdW5kLlwiXG4gICAgKTtcbiAgaWYgKCFpc0xvY2FsaG9zdENvbm5lY3Rpb25TdHJpbmcoY29ubmVjdGlvblN0cmluZykgJiYgIWlzUG9vbGVkQ29ubmVjdGlvblN0cmluZyhjb25uZWN0aW9uU3RyaW5nKSlcbiAgICB0aHJvdyBuZXcgVmVyY2VsUG9zdGdyZXNFcnJvcihcbiAgICAgIFwiaW52YWxpZF9jb25uZWN0aW9uX3N0cmluZ1wiLFxuICAgICAgXCJUaGlzIGNvbm5lY3Rpb24gc3RyaW5nIGlzIG1lYW50IHRvIGJlIHVzZWQgd2l0aCBhIGRpcmVjdCBjb25uZWN0aW9uLiBNYWtlIHN1cmUgdG8gdXNlIGEgcG9vbGVkIGNvbm5lY3Rpb24gc3RyaW5nIG9yIHRyeSBgY3JlYXRlQ2xpZW50KClgIGluc3RlYWQuXCJcbiAgICApO1xuICBsZXQgbWF4VXNlcyA9IGNvbmZpZyA9PSBudWxsID8gdm9pZCAwIDogY29uZmlnLm1heFVzZXM7XG4gIGxldCBtYXggPSBjb25maWcgPT0gbnVsbCA/IHZvaWQgMCA6IGNvbmZpZy5tYXg7XG4gIGlmICh0eXBlb2YgRWRnZVJ1bnRpbWUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpZiAobWF4VXNlcyAmJiBtYXhVc2VzICE9PSAxKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiQHZlcmNlbC9wb3N0Z3JlczogT3ZlcnJpZGluZyBgbWF4VXNlc2AgdG8gMSBiZWNhdXNlIHRoZSBFZGdlUnVudGltZSBkb2VzIG5vdCBzdXBwb3J0IGNsaWVudCByZXVzZS5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG1heCAmJiBtYXggIT09IDFlNCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBcIkB2ZXJjZWwvcG9zdGdyZXM6IE92ZXJyaWRpbmcgYG1heGAgdG8gMTAsMDAwIGJlY2F1c2UgdGhlIEVkZ2VSdW50aW1lIGRvZXMgbm90IHN1cHBvcnQgY2xpZW50IHJldXNlLlwiXG4gICAgICApO1xuICAgIH1cbiAgICBtYXhVc2VzID0gMTtcbiAgICBtYXggPSAxZTQ7XG4gIH1cbiAgY29uc3QgcG9vbDIgPSBuZXcgVmVyY2VsUG9vbCh7XG4gICAgLi4uY29uZmlnLFxuICAgIGNvbm5lY3Rpb25TdHJpbmcsXG4gICAgbWF4VXNlcyxcbiAgICBtYXhcbiAgfSk7XG4gIHJldHVybiBwb29sMjtcbn1cblxuLy8gc3JjL2luZGV4LnRzXG5pbXBvcnQgeyB0eXBlcyB9IGZyb20gXCJAbmVvbmRhdGFiYXNlL3NlcnZlcmxlc3NcIjtcbnZhciBwb29sO1xudmFyIHNxbCA9IG5ldyBQcm94eShcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAtLSBbQHZlcmNlbC9zdHlsZS1ndWlkZUA1IG1pZ3JhdGlvbl1cbiAgKCkgPT4ge1xuICB9LFxuICB7XG4gICAgZ2V0KF8sIHByb3ApIHtcbiAgICAgIGlmICghcG9vbCkge1xuICAgICAgICBwb29sID0gY3JlYXRlUG9vbCgpO1xuICAgICAgfVxuICAgICAgY29uc3QgdmFsID0gUmVmbGVjdC5nZXQocG9vbCwgcHJvcCk7XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiB2YWwuYmluZChwb29sKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSxcbiAgICBhcHBseShfLCBfXywgYXJndW1lbnRzTGlzdCkge1xuICAgICAgaWYgKCFwb29sKSB7XG4gICAgICAgIHBvb2wgPSBjcmVhdGVQb29sKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9vbC5zcWwoLi4uYXJndW1lbnRzTGlzdCk7XG4gICAgfVxuICB9XG4pO1xudmFyIGRiID0gc3FsO1xuXG5leHBvcnQge1xuICBwb3N0Z3Jlc0Nvbm5lY3Rpb25TdHJpbmcsXG4gIFZlcmNlbENsaWVudCxcbiAgY3JlYXRlQ2xpZW50LFxuICBWZXJjZWxQb29sLFxuICBjcmVhdGVQb29sLFxuICBzcWwsXG4gIGRiLFxuICB0eXBlc1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNodW5rLVdEQlFZQlpRLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@vercel+postgres@0.8.0/node_modules/@vercel/postgres/dist/chunk-WDBQYBZQ.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@vercel+postgres@0.8.0/node_modules/@vercel/postgres/dist/index-node.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@vercel+postgres@0.8.0/node_modules/@vercel/postgres/dist/index-node.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   VercelClient: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.VercelClient),\n/* harmony export */   VercelPool: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.VercelPool),\n/* harmony export */   createClient: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.createClient),\n/* harmony export */   createPool: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.createPool),\n/* harmony export */   db: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.db),\n/* harmony export */   postgresConnectionString: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.postgresConnectionString),\n/* harmony export */   sql: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.sql),\n/* harmony export */   types: () => (/* reexport safe */ _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__.types)\n/* harmony export */ });\n/* harmony import */ var _chunk_WDBQYBZQ_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk-WDBQYBZQ.js */ \"(rsc)/./node_modules/.pnpm/@vercel+postgres@0.8.0/node_modules/@vercel/postgres/dist/chunk-WDBQYBZQ.js\");\n/* harmony import */ var _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @neondatabase/serverless */ \"(rsc)/./node_modules/.pnpm/@neondatabase+serverless@0.7.2/node_modules/@neondatabase/serverless/index.mjs\");\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ws */ \"(rsc)/./node_modules/.pnpm/ws@8.14.2_bufferutil@4.0.8_utf-8-validate@6.0.3/node_modules/ws/wrapper.mjs\");\n\n\n// src/index-node.ts\n\n\nif (_neondatabase_serverless__WEBPACK_IMPORTED_MODULE_1__.neonConfig) {\n  _neondatabase_serverless__WEBPACK_IMPORTED_MODULE_1__.neonConfig.webSocketConstructor = ws__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\n}\n\n//# sourceMappingURL=index-node.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHZlcmNlbCtwb3N0Z3Jlc0AwLjguMC9ub2RlX21vZHVsZXMvQHZlcmNlbC9wb3N0Z3Jlcy9kaXN0L2luZGV4LW5vZGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFTNkI7O0FBRTdCO0FBQ3NEO0FBQ2xDO0FBQ3BCLElBQUksZ0VBQVU7QUFDZCxFQUFFLGdFQUFVLHdCQUF3QiwwQ0FBRTtBQUN0QztBQVVFO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvLnBucG0vQHZlcmNlbCtwb3N0Z3Jlc0AwLjguMC9ub2RlX21vZHVsZXMvQHZlcmNlbC9wb3N0Z3Jlcy9kaXN0L2luZGV4LW5vZGUuanM/ZGRhMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBWZXJjZWxDbGllbnQsXG4gIFZlcmNlbFBvb2wsXG4gIGNyZWF0ZUNsaWVudCxcbiAgY3JlYXRlUG9vbCxcbiAgZGIsXG4gIHBvc3RncmVzQ29ubmVjdGlvblN0cmluZyxcbiAgc3FsLFxuICB0eXBlc1xufSBmcm9tIFwiLi9jaHVuay1XREJRWUJaUS5qc1wiO1xuXG4vLyBzcmMvaW5kZXgtbm9kZS50c1xuaW1wb3J0IHsgbmVvbkNvbmZpZyB9IGZyb20gXCJAbmVvbmRhdGFiYXNlL3NlcnZlcmxlc3NcIjtcbmltcG9ydCB3cyBmcm9tIFwid3NcIjtcbmlmIChuZW9uQ29uZmlnKSB7XG4gIG5lb25Db25maWcud2ViU29ja2V0Q29uc3RydWN0b3IgPSB3cztcbn1cbmV4cG9ydCB7XG4gIFZlcmNlbENsaWVudCxcbiAgVmVyY2VsUG9vbCxcbiAgY3JlYXRlQ2xpZW50LFxuICBjcmVhdGVQb29sLFxuICBkYixcbiAgcG9zdGdyZXNDb25uZWN0aW9uU3RyaW5nLFxuICBzcWwsXG4gIHR5cGVzXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXgtbm9kZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@vercel+postgres@0.8.0/node_modules/@vercel/postgres/dist/index-node.js\n");

/***/ })

};
;