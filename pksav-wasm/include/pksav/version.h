/*
 * Copyright (c) 2016,2018 Nicholas Corgan (n.corgan@gmail.com)
 *
 * Distributed under the MIT License (MIT) (See accompanying file LICENSE.txt
 * or copy at http://opensource.org/licenses/MIT)
 */
#ifndef PKSAV_VERSION_H
#define PKSAV_VERSION_H

/*!
 * @brief PKSav major version.
 *
 * This number is incremented with wide-reaching library changes. Two
 * versions with differing major version numbers are virtually
 * guaranteed to be incompatible.
 */
#define PKSAV_VERSION_MAJOR 2

/*!
 * @brief PKSav minor version.
 *
 * This number is incremented with new feature support, usually the addition
 * of a new generation of games or adding features to an existing component.
 * Existing API is guaranteed to be compatible, but ABI may not be compatible.
 */
#define PKSAV_VERSION_MINOR 1

/*!
 * @brief PKSav patch version.
 *
 * This number is incremented when a significant set of bugfixes is added
 * without breaking ABI compatibility.
 */
#define PKSAV_VERSION_PATCH 0

//! A string literal representing PKSav's full version.
#define PKSAV_VERSION "2.1.0"

/*!
 * @brief An integer representation of PKSav's full version.
 *
 * This number is generated from version "X.Y.Z" as follows:
 *
 * (X * 1000000) + (Y * 1000) + Z
 */
#define PKSAV_VERSION_NUMBER 2001000

#endif /* PKSAV_VERSION_H */
