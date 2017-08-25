// Type definitions for log4js
// Project: https://github.com/nomiddlename/log4js-node
// Definitions by: Kentaro Okuno <http://github.com/armorik83>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "log4js" {
    declare interface Level {
        isEqualTo(other: string | Level): boolean;
        isLessThanOrEqualTo(other: string | Level): boolean;
        isGreaterThanOrEqualTo(other: string | Level): boolean;
    }

    declare interface Logger {
        setLevel(level: string | Level): void;
        isLevelEnabled(level: Level): boolean;
        isTraceEnabled(): boolean;
        isDebugEnabled(): boolean;
        isInfoEnabled(): boolean;
        isWarnEnabled(): boolean;
        isErrorEnabled(): boolean;
        isFatalEnabled(): boolean;

        trace(message: string, ...args: any[]): void;
        debug(message: string, ...args: any[]): void;
        info(message: string, ...args: any[]): void;
        warn(message: string, ...args: any[]): void;
        error(message: string, ...args: any[]): void;
        fatal(message: string, ...args: any[]): void;
    }

    declare interface IConfig {
        appenders: AppenderConfig[];
        levels?: { [category: string]: string };
        replaceConsole?: boolean;
    }

    declare interface AppenderConfigBase {
        type: string;
        category?: string;
        layout?: { type: string;[key: string]: any }
    }

    declare interface ConsoleAppenderConfig extends AppenderConfigBase {}

    declare interface FileAppenderConfig extends AppenderConfigBase {
        filename: string;
    }
    declare interface DateFileAppenderConfig extends FileAppenderConfig {
        /**
         * The following strings are recognised in the pattern:
         *  - yyyy : the full year, use yy for just the last two digits
         *  - MM   : the month
         *  - dd   : the day of the month
         *  - hh   : the hour of the day (24-hour clock)
         *  - mm   : the minute of the hour
         *  - ss   : seconds
         *  - SSS  : milliseconds (although I'm not sure you'd want to roll your logs every millisecond)
         *  - O    : timezone (capital letter o)
         */
        pattern: string;
        alwaysIncludePattern: boolean;
    }

    declare interface SmtpAppenderConfig extends AppenderConfigBase {
        /** Comma separated list of email recipients */
        recipients: string;

        /** Sender of all emails (defaults to transport user) */
        sender: string;

        /** Subject of all email messages (defaults to first event's message)*/
        subject: string;

        /**
         * The time in seconds between sending attempts (defaults to 0).
         * All events are buffered and sent in one email during this time.
         * If 0 then every event sends an email
         */
        sendInterval: number;

        SMTP: {
            host: string;
            secure: boolean;
            port: number;
            auth: {
                user: string;
                pass: string;
            }
        }
    }

    declare interface HookIoAppenderConfig extends FileAppenderConfig {
        maxLogSize: number;
        backup: number;
        pollInterval: number;
    }

    declare interface GelfAppenderConfig extends AppenderConfigBase {
        host: string;
        hostname: string;
        port: string;
        facility: string;
    }

    declare interface MultiprocessAppenderConfig extends AppenderConfigBase {
        mode: string;
        loggerPort: number;
        loggerHost: string;
        facility: string;
        appender?: AppenderConfig;
    }

    declare interface LogglyAppenderConfig extends AppenderConfigBase {
        /** Loggly customer token - https://www.loggly.com/docs/api-sending-data/ */
        token: string;

        /** Loggly customer subdomain (use 'abc' for abc.loggly.com) */
        subdomain: string;

        /** an array of strings to help segment your data & narrow down search results in Loggly */
        tags: string[];

        /** Enable JSON logging by setting to 'true' */
        json: boolean;
    }

    declare interface ClusteredAppenderConfig extends AppenderConfigBase {
        appenders?: AppenderConfig[];
    }

    declare type CoreAppenderConfig = ConsoleAppenderConfig
        | FileAppenderConfig
        | DateFileAppenderConfig
        | SmtpAppenderConfig
        | HookIoAppenderConfig
        | GelfAppenderConfig
        | MultiprocessAppenderConfig
        | LogglyAppenderConfig
        | ClusteredAppenderConfig

    declare interface CustomAppenderConfig extends AppenderConfigBase {
        [prop: string]: any;
    }

    declare type AppenderConfig = CoreAppenderConfig | CustomAppenderConfig;

    declare interface LogEvent {
        /**
         * new Date()
         */
        startTime: number;
        categoryName: string;
        data: any[];
        level: Level;
        logger: Logger;
    }

    declare interface Appender {
        (event: LogEvent): void;
    }

    declare interface AppenderModule {
        appender: (...args: any[]) => Appender;
        shutdown?: (cb: (error: Error) => void) => void;
        configure: (config: CustomAppenderConfig, options?: { [key: string]: any }) => Appender;
    }

    declare interface LayoutConfig {
        [key: string]: any;
    }
    declare interface LayoutGenerator {
        (config?: LayoutConfig): Layout
    }

    declare interface Layout {
        (event: LogEvent): string;
    }

    /**
     * Replaces the console
     * @param logger
     * @returns void
     */
    declare function replaceConsole(logger?: Logger): void;

    /**
     * Restores the console
     * @returns void
     */
    declare function restoreConsole(): void;

    /**
     * Get a logger instance. Instance is cached on categoryName level.
     *
     * @param   {String} [categoryName] name of category to log to.
     * @returns {Logger} instance of logger for the category
     * @static
     */
    declare function getLogger(categoryName?: string): Logger;
    declare function getBufferedLogger(categoryName?: string): Logger;

    /**
     * Has a logger instance cached on categoryName.
     *
     * @param   {String} [categoryName] name of category to log to.
     * @returns {boolean} contains logger for the category
     * @static
     */
    declare function hasLogger(categoryName: string): boolean;

    /**
     * Get the default logger instance.
     *
     * @returns {Logger} instance of default logger
     * @static
     */
    declare function getDefaultLogger(): Logger;

    /**
     * args are appender, then zero or more categories
     *
     * @param   {*[]} appenders
     * @returns {void}
     * @static
     */
    declare function addAppender(...appenders: any[]): void;

    /**
     * Load appender
     *
     * @param   {string} appender type
     * @param   {AppenderModule} the appender module. by default, require('./appenders/' + appender)
     * @returns {void}
     * @static
     */
    declare function loadAppender(appenderType: string, appenderModule?: AppenderModule): void;

    /**
     * Claer configured appenders
     *
     * @returns {void}
     * @static
     */
    declare function clearAppenders(): void;

    /**
     * Shutdown all log appenders. This will first disable all writing to appenders
     * and then call the shutdown function each appender.
     *
     * @params  {Function} cb - The callback to be invoked once all appenders have
     *  shutdown. If an error occurs, the callback will be given the error object
     *  as the first argument.
     * @returns {void}
     */
    declare function shutdown(cb: Function): void;
    declare function configure(config: string | IConfig, options?: any): void;
    declare function setGlobalLogLevel(level: string | Level): void;

    /**
     * Create logger for connect middleware.
     *
     *
     * @returns {express.Handler} Instance of middleware.
     * @static
     */
        // declare function connectLogger(logger: Logger, options: { format?: string; level?: string; nolog?: any; }): express.Handler;
        // declare function connectLogger(logger: Logger, options: { format?: string; level?: Level; nolog?: any; }): express.Handler;

    declare var layouts: {
        basicLayout: Layout,
        messagePassThroughLayout: Layout,
        patternLayout: Layout,
        colouredLayout: Layout,
        coloredLayout: Layout,
        dummyLayout: Layout,

        /**
         * Register your custom layout generator
         */
        addLayout: (name: string, serializerGenerator: (config?: LayoutConfig) => Layout) => void,

        /**
         * Get layout. Available predified layout names:
         * messagePassThrough, basic, colored, coloured, pattern, dummy
         *
         */
        layout: (name: string, config: LayoutConfig) => Layout
    };

    declare var appenders: any;
    declare var levels: {
        ALL: Level;
        TRACE: Level;
        DEBUG: Level;
        INFO: Level;
        WARN: Level;
        ERROR: Level;
        FATAL: Level;
        OFF: Level;

        toLevel(level: string, defaultLevel?: Level): Level;
        toLevel(level: Level, defaultLevel?: Level): Level;
    };
}
