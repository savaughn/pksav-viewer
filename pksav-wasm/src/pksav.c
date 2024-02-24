#include "emscripten.h"
#include "pksav.h"
#include <stdio.h>
#include <string.h>
#include "pkmnstats.h"

typedef enum
{
    SAVE_GENERATION_NONE,
    SAVE_GENERATION_1,
    SAVE_GENERATION_2,
    SAVE_GENERATION_3,
    SAVE_GENERATION_CORRUPTED,
} SaveGenerationType;

EMSCRIPTEN_KEEPALIVE
int load_save_file(void *pkmn_save, const char file_path[100], uint8_t generation)
{
    switch (generation)
    {
    case 1:
    {
        enum pksav_error error = PKSAV_ERROR_NONE;
        error = pksav_gen1_load_save_from_file(file_path, (struct pksav_gen1_save *)pkmn_save);

        if (error != PKSAV_ERROR_NONE)
        {
            printf("Error loading save file: %d\n", error);
            return error;
        }
        printf("Save file loaded successfully\n");

        return error;
    }
    case 2:
    {
        enum pksav_error error = PKSAV_ERROR_NONE;
        error = pksav_gen2_load_save_from_file(file_path, (struct pksav_gen2_save *)pkmn_save);

        if (error != PKSAV_ERROR_NONE)
        {
            printf("Error loading save file: %d\n", error);
            return error;
        }
        printf("Save file loaded successfully\n");

        return error;
    }
    default:
        break;
    }
}

EMSCRIPTEN_KEEPALIVE
char *get_trainer_name(void *pkmn_save, uint8_t generation)
{
    static char trainer_name[8] = {"\0"};
    switch (generation)
    {
    case SAVE_GENERATION_1:
    {
        enum pksav_error error = pksav_gen1_import_text(((struct pksav_gen1_save *)pkmn_save)->trainer_info.p_name, trainer_name, 7);
        if (error != PKSAV_ERROR_NONE)
        {
            printf("Error getting trainer name: %d\n", error);
            return "MissingNm.";
        }
        return trainer_name;
    }

    case SAVE_GENERATION_2:
    {
        enum pksav_error error = pksav_gen2_import_text(((struct pksav_gen2_save *)pkmn_save)->trainer_info.p_name, trainer_name, 7);
        if (error != PKSAV_ERROR_NONE)
        {
            printf("Error getting trainer name: %d\n", error);
            return "MissingNm.";
        }
        return trainer_name;
    }

    default:
        return "MissingNm.";
    }
}

EMSCRIPTEN_KEEPALIVE
char *get_trainer_id(struct pksav_gen1_save *pkmn_save)
{
    uint16_t trainer_id = pksav_bigendian16(*pkmn_save->trainer_info.p_id);
    static char trainer_id_str[6] = {"\0"};
    sprintf(trainer_id_str, "%05d", trainer_id);
    return trainer_id_str;
}

EMSCRIPTEN_KEEPALIVE
int get_party_count(void *pkmn_save, uint8_t generation)
{
    switch (generation)
    {
    case 1:
        puts("gen1");
        return ((struct pksav_gen1_save *)pkmn_save)->pokemon_storage.p_party->count;
        break;
    case 2:
        puts("gen2");
        return ((struct pksav_gen2_save *)pkmn_save)->pokemon_storage.p_party->count;
        break;
    default:
        break;
    }
}

EMSCRIPTEN_KEEPALIVE
int get_party_data_at_index(struct pksav_gen1_save *pkmn_save, uint8_t index, struct pksav_gen1_party_pokemon *pkmn_party)
{
    uint8_t party_count = pkmn_save->pokemon_storage.p_party->count;
    if (index >= party_count)
    {
        printf("Index out of range\n");
        return 1;
    }
    pkmn_party->pc_data.species = pkmn_save->pokemon_storage.p_party->party[index].pc_data.species;
    pkmn_party->pc_data.current_hp = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].pc_data.current_hp);
    pkmn_party->pc_data.condition = pkmn_save->pokemon_storage.p_party->party[index].pc_data.condition;
    pkmn_party->pc_data.types[0] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.types[0];
    pkmn_party->pc_data.types[1] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.types[1];
    pkmn_party->pc_data.catch_rate = pkmn_save->pokemon_storage.p_party->party[index].pc_data.catch_rate;
    pkmn_party->pc_data.moves[0] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.moves[0];
    pkmn_party->pc_data.moves[1] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.moves[1];
    pkmn_party->pc_data.moves[2] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.moves[2];
    pkmn_party->pc_data.moves[3] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.moves[3];
    pkmn_party->pc_data.ot_id = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].pc_data.ot_id);

    // size_t *experience = 0;
    // pksav_import_base256(pkmn_save->pokemon_storage.p_party->party[index].pc_data.exp, 3, experience);
    pkmn_party->pc_data.ev_hp = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].pc_data.ev_hp);
    pkmn_party->pc_data.ev_atk = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].pc_data.ev_atk);
    pkmn_party->pc_data.ev_def = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].pc_data.ev_def);
    pkmn_party->pc_data.ev_spd = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].pc_data.ev_spd);
    pkmn_party->pc_data.ev_spcl = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].pc_data.ev_spcl);

    // TODO: might need pp move masking
    pkmn_party->pc_data.move_pps[0] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.move_pps[0];
    pkmn_party->pc_data.move_pps[1] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.move_pps[1];
    pkmn_party->pc_data.move_pps[2] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.move_pps[2];
    pkmn_party->pc_data.move_pps[3] = pkmn_save->pokemon_storage.p_party->party[index].pc_data.move_pps[3];

    pkmn_party->party_data.level = pkmn_save->pokemon_storage.p_party->party[index].party_data.level;
    pkmn_party->party_data.atk = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.atk);
    pkmn_party->party_data.def = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.def);
    pkmn_party->party_data.spd = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.spd);
    pkmn_party->party_data.spcl = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.spcl);
    pkmn_party->party_data.max_hp = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.max_hp);

    return 0;
}

struct generic_dv
{
    uint8_t atk;
    uint8_t def;
    uint8_t spd;
    uint8_t spcl;
    uint8_t hp;
};

EMSCRIPTEN_KEEPALIVE
int get_pkmn_dvs(struct pksav_gen1_save *pkmn_save, uint8_t index, struct generic_dv *pkmn_dvs)
{
    uint8_t dvs[PKSAV_NUM_GB_IVS];
    pksav_get_gb_IVs(&pkmn_save->pokemon_storage.p_party->party[index].pc_data.iv_data, dvs, sizeof(dvs));
    pkmn_dvs->atk = dvs[PKSAV_GB_IV_ATTACK];
    pkmn_dvs->def = dvs[PKSAV_GB_IV_DEFENSE];
    pkmn_dvs->spd = dvs[PKSAV_GB_IV_SPEED];
    pkmn_dvs->spcl = dvs[PKSAV_GB_IV_SPECIAL];
    pkmn_dvs->hp = dvs[PKSAV_GB_IV_HP];
    return 0;
}

EMSCRIPTEN_KEEPALIVE
char *get_pkmn_nickname(struct pksav_gen1_save *pkmn_save, uint8_t index)
{
    static char pkmn_nickname[11] = {"\0"};
    enum pksav_error error = pksav_gen1_import_text(pkmn_save->pokemon_storage.p_party->nicknames[index], pkmn_nickname, 10);
    if (error != PKSAV_ERROR_NONE)
    {
        printf("Error getting pokemon nickname: %d\n", error);
        return "MissingNo.";
    }
    return pkmn_nickname;
}

EMSCRIPTEN_KEEPALIVE
int get_pkdex_entry(struct pksav_gen1_save *pkmn_save, uint8_t index)
{
    return species_gen1_to_gen2[pkmn_save->pokemon_storage.p_party->party[index].pc_data.species];
}

EMSCRIPTEN_KEEPALIVE
/**
 * @brief detects the save file generation of a save file
 * @param path the path to the save file
 * @param save_generation_type a pointer to a SaveGenerationType to store the save generation type
 * @return an enum pksav_error
 */
int detect_savefile_generation(char *path, uint8_t *save_generation_type)
{
    enum pksav_error err = PKSAV_ERROR_NONE;

    enum pksav_gen1_save_type gen1_save_type = PKSAV_GEN1_SAVE_TYPE_NONE;
    enum pksav_gen2_save_type gen2_save_type = PKSAV_GEN2_SAVE_TYPE_NONE;
    enum pksav_gen3_save_type gen3_save_type = PKSAV_GEN3_SAVE_TYPE_NONE;

    uint8_t error = pksav_gen1_get_file_save_type(path, &gen1_save_type);

    if (error)
    {
        pksav_gen2_get_file_save_type(path, &gen2_save_type);
        if (gen2_save_type == PKSAV_GEN2_SAVE_TYPE_NONE)
        {
            pksav_gen3_get_file_save_type(path, &gen3_save_type);
            if (gen3_save_type == PKSAV_GEN3_SAVE_TYPE_NONE)
            {
                *save_generation_type = SAVE_GENERATION_CORRUPTED;
                return 0;
            }
            else
            {
                // Not yet supported return corrupted
                return 4;
                // *save_generation_type = SAVE_GENERATION_3;
            }
        }
        else
        {
            *save_generation_type = SAVE_GENERATION_2;
        }
    }
    else
    {
        *save_generation_type = SAVE_GENERATION_1;
    }

    return err;
}