const { series, parallel } = require("gulp")
const { buildTypescript, watchTypescript, watchTypescriptSymlink } = require("./typescript")
const { copyReadmeFiles, watchReadmeFiles } = require("./readme")
const { buildScss, watchScss, watchScssSymlink } = require("./scss")
const { createBundle } = require("./bundle")
const { serveDemo, serveSite } = require("./serve")
const { copyFontFiles } = require("./font")
const { buildH5, buildSite, copyH5, copySite } = require("./dist")

function watch() {
  watchScss("icons")
  watchScss("core")
  watchTypescript("icons")
  watchTypescript("hooks")
  watchTypescript("core")
  watchReadmeFiles("core/src", "components")
  watchReadmeFiles("core/docs", "components")
  watchReadmeFiles("hooks/src", "hooks")
}

function watchSymlink() {
  watchScssSymlink("icons")
  watchScssSymlink("core")
  watchTypescriptSymlink("icons")
  watchTypescriptSymlink("hooks")
  watchTypescriptSymlink("core")
  watchReadmeFiles("core/src", "components")
  watchReadmeFiles("core/docs", "components")
  watchReadmeFiles("hooks/src", "hooks")
}

exports.clean = series(
  createBundle("core"), //
  createBundle("hooks"), //
  createBundle("icons"),
)

exports.develop = parallel(
  createBundle("icons"), //
  createBundle("hooks"), //
  createBundle("core"), //
  watchSymlink,
  serveDemo,
  serveSite,
)

exports.watch = watch

exports.build = series(
  createBundle("icons"),
  createBundle("hooks"), //
  createBundle("core"), //
  copyFontFiles("core"), //
  buildScss("icons"), //
  buildScss("core"), //
  buildTypescript("icons"),
  buildTypescript("hooks"), //
  buildTypescript("core"), //
)

const readme = series(
  copyReadmeFiles("core/src", "components"), //
  copyReadmeFiles("core/docs", "components"), //
  copyReadmeFiles("hooks/src", "hooks"),
)

exports.buildSite = series(buildH5, readme, buildSite, copyH5(), copySite())

exports.readme = readme

exports.serve = parallel(serveDemo, serveSite)
