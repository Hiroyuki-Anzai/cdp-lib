﻿/*!
 * cdp-lib.d.ts
 * This file is generated by the CDP package build process.
 *
 * Date: 2017-05-16T02:10:32.736Z
 */
// Dependencies for this module:
//   ../fs-extra
//   ../glob
//   ../hogan.js
//   ../lodash
//   ../underscore.string
//   ../which
//   ../uuid
//   ../chalk
//   ../semver-regex
//   ../cli-spinner
//   ../child_process

declare module "cdp-lib" {
    import * as Utils from "cdp-lib/utils";
    export { Utils };
    import { ISourceDirctoryConfigration, IBaseStructureConfigration, IProjectConfigration, ICompileConfigration, ILibraryConfigration, IMobileAppConfigration, IDesktopAppConfigration, IWebAppConfigration } from "cdp-lib/generators";
    export { ISourceDirctoryConfigration, IBaseStructureConfigration, IProjectConfigration, ICompileConfigration, ILibraryConfigration, IMobileAppConfigration, IDesktopAppConfigration, IWebAppConfigration };
    /**
     * @class CDPLib
     * @brief CDP boilerplate 生成機能を提供するクラス
     */
    export default class CDPLib {
        /**
         * main command
         */
        static execute(config: IProjectConfigration): Promise<void>;
    }
}

declare module "cdp-lib/utils" {
    export * from "cdp-lib/utils/libs";
    export * from "cdp-lib/utils/tools";
    export * from "cdp-lib/utils/settings";
}

declare module "cdp-lib/generators" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/library";
    export * from "cdp-lib/generators/mobile";
    export * from "cdp-lib/generators/desktop";
    export * from "cdp-lib/generators/web";
    /**
      * generator 生成関数
      */
    export function newGenerator(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/utils/libs" {
    import * as fs from "fs-extra";
    import * as glob from "glob";
    import * as hogan from "hogan.js";
    import * as _l from "lodash";
    import * as _s from "underscore.string";
    import * as which from "which";
    import * as uuid from "uuid";
    import * as chalk from "chalk";
    import * as semverRegex from "semver-regex";
    import { Spinner } from "cli-spinner";
    const $: JQueryStatic;
    export type MixinedUnderscoreStatic = typeof _s & typeof _l;
    const _m: MixinedUnderscoreStatic;
    export { fs, glob, hogan, $, _m as _, which, uuid, chalk, semverRegex, Spinner };
}

declare module "cdp-lib/utils/tools" {
    import { SpawnOptions } from "child_process";
    /**
     * Handle command line error and kill process.
     * When the application received error from cli, please call this method.
     *
     * @param {String} error  error information.
     */
    export function handleError(error: string): void;
    /**
     * "templates" ディレクトリからのパスを取得.
     *
     * @param  {String} target ターゲットを指定. null の場合は、templates を返却
     * @return {String} templates/hogehoge
     */
    export function templatePath(target: string): string;
    /**
     * Get spinner instance.
     * CLI helper.
     *
     * @param  {String}  [format]  spinner format string.
     * @param  {Number}  [index]   spinner index defined by cli-spinner. (default: random [0-29])
     * @return {Spinner} cli-spinner instance.
     */
    export function getSpinner(format?: string, index?: number): {
        start: () => void;
        stop: (clean?: boolean) => void;
    };
    /**
     * @interface NormalizeTextOptions
     * @brief normalizeText() に指定するオプション
     */
    export interface NormalizeTextOptions {
        eol?: string;
        bom?: boolean;
        tab?: number;
    }
    /**
     * Normalize text line-feed.
     * for windows git user.
     *
     * @param  {String}               text      input text.
     * @param  {NormalizeTextOptions} [options] option.
     * @return {String} normalized text.
     */
    export function normalizeText(text: string, options?: NormalizeTextOptions): string;
    /**
     * @interface ExecCommandOptions
     * @brief execCommand() に指定するオプション
     */
    export interface ExecCommandOptions extends SpawnOptions {
        spinner?: {
            format?: string;
            index?: number;
        };
        stdout?: (data: string) => void;
        stderr?: (data: string) => void;
    }
    /**
     * Execute command line by spawn.
     * call spawn. if error occured, cui is killed proccess.
     *
     * @param   {String}               command    main command. ex) "cordova"
     * @param   {String[]}             args       command args. ex) ["plugin", "add", pluginName]
     * @param   {ExecCommandOptions}   [options]  cli-spinner"s options.
     * @returns {Number} error code
     */
    export function execCommand(command: string, args: string[], options?: ExecCommandOptions): Promise<number>;
    /**
     * @interface CopyTemplateOptions
     * @brief copyTpl() に指定するオプション
     */
    export interface CopyTemplateOptions extends NormalizeTextOptions {
        delimiters?: "{{ }}" | "<% %>";
    }
    /**
     * Copy template with hogan.
     * sync function
     *
     * @param {String}               src       source file path.
     * @param {String}               dst       destination file path.
     * @param {Object}               params    template parameters.
     * @param {CopyTemplateOptions}  [options] options object.
     */
    export function copyTpl(src: string, dst: string, params: Object, options?: CopyTemplateOptions): void;
    /**
     * GUID generate.
     * returned as Windows registry type format.
     *
     * @return {String}
     */
    export function createGUID(): string;
    /**
     * Create XML DOM node.
     *
     * @param  {String} str  string xml format. ex) "<preference name="DisallowOverscroll" value="true"/>"
     * @return {jQuery} XML Node instance
     */
    export function str2XmlNode(str: string): JQuery;
    /**
     * @interface FormatXmlOptions
     * @brief formatXML() に指定するオプション
     */
    export interface FormatXmlOptions extends NormalizeTextOptions {
        step?: number;
    }
    /**
     * XML formatter.
     *
     * @param  {String}           str       string xml format. ex) "<preference name="DisallowOverscroll" value="true"/>"
     * @param  {FormatXmlOptions} [options] options object.
     * @return {String} formatted XML
     */
    export function formatXML(str: string, options?: FormatXmlOptions): string;
}

declare module "cdp-lib/utils/settings" {
    /**
     * @interface IGlobalSettings
     * @brief グローバル設定インターフェイス
     */
    export interface IGlobalSettings {
        force?: boolean;
        verbose?: boolean;
        silent?: boolean;
        libPath?: string;
        targetDir?: string;
        lang?: "en-US" | "ja-JP";
    }
    /**
     * 設定取得
     *
     * @return {IGlobalSettings} options ログに使用するオプション
     */
    export function getSettings(): IGlobalSettings;
    /**
     * 設定指定
     *
     * @param {IGlobalSettings} options ログに使用するオプション
     */
    export function setSettings(settings: IGlobalSettings): void;
    /**
     * "cdp-lib" が存在するパスを取得
     *
     * @return {String} cdp-lib への path
     */
    export function getLibPath(): string;
    /**
     * 指定された targetDir を取得
     *
     * @return {String} targetDir への path
     */
    export function getTargetDir(): string;
    /**
     * ログ出力
     * console.log() と同等
     *
     * @param {String} message        出力メッセージ
     * @param {Any[]}  optionalParams 付加情報
     */
    export function log(message?: string, ...optionalParams: any[]): void;
    /**
     * 詳細ログ出力
     * console.debug() と同等
     *
     * @param {String} message        出力メッセージ
     * @param {Any[]}  optionalParams 付加情報
     */
    export function debug(message?: string, ...optionalParams: any[]): void;
    /**
     * 検証
     * console.assert() と同等
     *
     * @param {Boolean} test           検証する式
     * @param {String}  message        出力メッセージ
     * @param {Any[]}   optionalParams 付加情報
     */
    export function assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
    /**
     * ローカライズ
     *
     * @param {String} key キー文字列
     * @return 翻訳された文字列
     */
    export function translate(key: string): string;
}

declare module "cdp-lib/generators/base" {
    export * from "cdp-lib/generators/base/interfaces";
    export * from "cdp-lib/generators/base/generator-base";
}

declare module "cdp-lib/generators/library" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/library/interfaces";
    export * from "cdp-lib/generators/library/generator-module";
    /**
      * generator 生成関数
      */
    export function newGeneratorLibrary(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/mobile" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/mobile/interfaces";
    export * from "cdp-lib/generators/mobile/generator-cordova";
    /**
      * generator 生成関数
      */
    export function newGeneratorMobile(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/desktop" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/desktop/interfaces";
    export * from "cdp-lib/generators/desktop/generator-electoron";
    /**
      * generator 生成関数
      */
    export function newGeneratorDesktop(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/web" {
    import { GeneratorBase, IProjectConfigration } from "cdp-lib/generators/base";
    export * from "cdp-lib/generators/web/interfaces";
    export * from "cdp-lib/generators/web/generator-browser";
    /**
      * generator 生成関数
      */
    export function newGeneratorWeb(config: IProjectConfigration): GeneratorBase;
}

declare module "cdp-lib/generators/base/interfaces" {
    import * as Utils from "cdp-lib/utils";
    export { Utils };
    /**
     * @interface ISourceDirctoryConfigration
     * @brief ソースディレクトリのコンフィギュレーション設定
     */
    export interface ISourceDirctoryConfigration {
        script?: string;
        stylesheet?: string;
        template?: string;
    }
    /**
     * @interface IBaseStructureConfigration
     * @brief プロジェクトディレクトリのコンフィギュレーション設定
     */
    export interface IBaseStructureConfigration {
        src?: string;
        pkg?: string;
        built?: string;
        doc?: string;
        task?: string;
        test?: string;
        types?: string;
        srcConfig?: ISourceDirctoryConfigration;
    }
    /**
     * @interface IDependency
     * @brief package.json に指定する dependencies 情報を格納するインターフェイス
     */
    export interface IDependency {
        name: string;
        version?: string;
        esTarget?: string[];
    }
    /**
     * @interface IProjectConfigration
     * @brief プロジェクト共通のコンフィギュレーション設定
     */
    export interface IProjectConfigration {
        projectName: string;
        projectKind: string;
        action: string;
        version: string;
        license: string;
        settings: Utils.IGlobalSettings;
        namespace?: string;
        structureConfig?: IBaseStructureConfigration;
        copyright?: string;
        devDependencies?: IDependency[];
    }
    /**
     * @interface ICompileConfigration
     * @brief コンパイルコンフィギュレーション設定
     */
    export interface ICompileConfigration {
        esTarget?: "es5" | "es2015";
        moduleSystem?: "none" | "commonjs" | "amd" | "umd";
        webpackTarget?: string;
        supportCSS?: boolean;
    }
}

declare module "cdp-lib/generators/base/generator-base" {
    import { glob } from "cdp-lib/utils";
    import { IBaseStructureConfigration, IDependency, IProjectConfigration } from "cdp-lib/generators/base/interfaces";
    /**
     * @class GeneratorBase
     * @brief すべての Generator の既定クラス
     */
    export abstract class GeneratorBase {
        protected _config: IProjectConfigration;
        /**
         * constructor
         *
         * @param {IProjectConfigration} config コンフィグ
         */
        constructor(_config: IProjectConfigration);
        /**
         * 処理開始 (エントリ)
         *
         */
        run(): Promise<void>;
        abstract defaultBaseStructure(): IBaseStructureConfigration;
        abstract create(): Promise<void>;
        readonly abstract taskList: string[];
        /**
         * 進捗テキストを通知
         *
         * @param {String} key ローカライズリソースキーを指定
         */
        protected progress(key: string): void;
        /**
         * work directory の変更
         *
         * @param {String} directory target directory.
         */
        protected chdir(directory: string): void;
        /**
         * project root directory の取得
         *
         * @param {String} directory target directory.
         */
        protected readonly rootDir: string;
        /**
         * template directory を指定して配下のファイルをコピー
         * IBaseStructureConfigration の設定が反映される
         *
         * @param {String} path    ターゲットを指定. null の場合は、templates を返却
         * @param {String} dstRoot コピー先を指定. 指定が無い場合は rootDir が設定
         */
        protected copyTplDir(target: string, dstRoot?: string, options?: glob.IOptions): void;
        /**
         * project root directory の取得
         *
         * @param {String} directory target directory.
         */
        protected queryNodeModuleLatestVersion(name: string): Promise<string>;
        /**
         * 開発時の依存モジュールリストの取得
         * 必要に応じてオーバーライド
         *
         * @return {IDevDependencies}
         */
        protected readonly devDependencies: IDependency[];
        /**
         * devDependencies の template paramaeter を取得
         *
         * @return {{ name: string; version: string; last?: boolean; }[]} テンプレートパラメータに指定する配列
         */
        protected queryDevDependenciesParam(): Promise<{
            name: string;
            version: string;
            last?: boolean;
        }[]>;
    }
}

declare module "cdp-lib/generators/library/interfaces" {
    import { IProjectConfigration, ICompileConfigration } from "cdp-lib/generators/base";
    /**
      * @interface ILibraryConfigration
      * @brief library module プロジェクトのコンフィギュレーション設定
      */
    export interface ILibraryConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "library";
        webpackTarget?: "node" | "web" | "electron" | "electron-renderer";
        moduleName?: string;
    }
}

declare module "cdp-lib/generators/library/generator-module" {
    import { IBaseStructureConfigration, IDependency, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorModule
     * @brief Library Module 用 Generator クラス
     */
    export class GeneratorModule extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {ILibraryConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
        /**
         * 開発時の依存モジュールリストの取得
         * 必要に応じてオーバーライド
         *
         * @return {IDevDependencies}
         */
        protected readonly devDependencies: IDependency[];
    }
}

declare module "cdp-lib/generators/mobile/interfaces" {
    import { IProjectConfigration, ICompileConfigration } from "cdp-lib/generators/base";
    /**
      * @interface IMobileAppConfigration
      * @brief mobile プロジェクトのコンフィギュレーション設定
      */
    export interface IMobileAppConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "mobile";
        webpackTarget?: "web";
        supportCSS: true;
    }
}

declare module "cdp-lib/generators/mobile/generator-cordova" {
    import { IBaseStructureConfigration, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorCordova
     * @brief Mobile Cordova 用 Generator クラス
     */
    export class GeneratorCordova extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {ILibraryConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
    }
}

declare module "cdp-lib/generators/desktop/interfaces" {
    import { IProjectConfigration, ICompileConfigration } from "cdp-lib/generators/base";
    /**
      * @interface IDesktopAppConfigration
      * @brief mobile プロジェクトのコンフィギュレーション設定
      */
    export interface IDesktopAppConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "desktop";
        webpackTarget?: "web" | "electron-renderer";
        supportCSS: true;
    }
}

declare module "cdp-lib/generators/desktop/generator-electoron" {
    import { IBaseStructureConfigration, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorElectron
     * @brief Desktop Electron 用 Generator クラス
     */
    export class GeneratorElectron extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {IDesktopAppConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
    }
}

declare module "cdp-lib/generators/web/interfaces" {
    import { IProjectConfigration, ICompileConfigration } from "cdp-lib/generators/base";
    /**
      * @interface IWebAppConfigration
      * @brief web プロジェクトのコンフィギュレーション設定
      */
    export interface IWebAppConfigration extends IProjectConfigration, ICompileConfigration {
        projectKind: "web";
        webpackTarget?: "web";
        supportCSS: true;
    }
}

declare module "cdp-lib/generators/web/generator-browser" {
    import { IBaseStructureConfigration, GeneratorBase } from "cdp-lib/generators/base";
    /**
     * @class GeneratorBrowser
     * @brief Web Browser 用 Generator クラス
     */
    export class GeneratorBrowser extends GeneratorBase {
        /**
         * 既定の directory 構造を返却
         */
        defaultBaseStructure(): IBaseStructureConfigration;
        /**
         * create action entry
         * @param {ILibraryConfigration} config コンフィグ設定
         */
        create(): Promise<void>;
        /**
         * 必要とする task script 一覧を返却. action: create のときに呼ばれる
         */
        readonly taskList: string[];
    }
}

