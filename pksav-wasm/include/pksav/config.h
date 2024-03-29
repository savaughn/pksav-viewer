/*
 * Copyright (c) 2016,2018 Nicholas Corgan (n.corgan@gmail.com)
 *
 * Distributed under the MIT License (MIT) (See accompanying file LICENSE.txt
 * or copy at http://opensource.org/licenses/MIT)
 */
#ifndef PKSAV_CONFIG_H
#define PKSAV_CONFIG_H

/***************************************************************************
 * Define cross-platform macros, platform-specific stuff
 ***************************************************************************/
#if defined(_MSC_VER)
#    define PKSAV_EXPORT __declspec(dllexport)
#    define PKSAV_IMPORT __declspec(dllimport)
#    pragma warning(disable: 4800) // forcing value to bool 'true' or 'false'
#elif defined(__GNUC__) && __GNUC__ >= 4
#    define PKSAV_EXPORT __attribute__((visibility("default")))
#    define PKSAV_IMPORT __attribute__((visibility("default")))
#else
#    define PKSAV_EXPORT
#    define PKSAV_IMPORT
#endif

#ifdef PKSAV_DLL_EXPORTS
#    define PKSAV_API PKSAV_EXPORT
#else
#    define PKSAV_API PKSAV_IMPORT
#endif

#if defined(linux) || defined(__linux) || defined(__linux__)
#    define PKSAV_PLATFORM_LINUX
#elif defined(__MINGW32__) || defined(MINGW32)
#    define PKSAV_PLATFORM_MINGW
#elif defined(_WIN32) || defined(__WIN32__) || defined(WIN32)
#    define PKSAV_PLATFORM_WIN32
#elif defined(macintosh) || defined(__APPLE__) || defined(__APPLE_CC__)
#    define PKSAV_PLATFORM_MACOS
#endif

/*
 * Not all supported platforms have ssize_t, so if that's the case, define
 * it ourselves.
 */
#ifndef HAVE_SSIZE_T

#include <stdint.h>
typedef long ssize_t;

#define HAVE_SSIZE_T

#endif

/*
 * Determined at compile-time, do not change!
 */

/* #undef PKSAV_BIG_ENDIAN */
#define PKSAV_LITTLE_ENDIAN 1

#endif /* PKSAV_CONFIG_H */
