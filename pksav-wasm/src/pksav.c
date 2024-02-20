#include "emscripten.h"
#include "pksav.h"
#include <stdio.h>
#include <string.h>

int load_save_file(struct pksav_gen1_save *pkmn_save, const char file_path[100]);
char* get_trainer_name(struct pksav_gen1_save *pkmn_save);

EMSCRIPTEN_KEEPALIVE
int load_save_file(struct pksav_gen1_save *pkmn_save, const char file_path[100])
{
    enum pksav_error error = PKSAV_ERROR_NONE;

    error = pksav_gen1_load_save_from_file(file_path, pkmn_save);

    if (error != PKSAV_ERROR_NONE)
    {
        printf("Error loading save file: %d\n", error);
        return error;
    }
    printf("Save file loaded successfully\n");

    return error;
}

EMSCRIPTEN_KEEPALIVE
char* get_trainer_name(struct pksav_gen1_save *pkmn_save)
{
    static char trainer_name[8] = {"\0"};
    enum pksav_error error = pksav_gen1_import_text(pkmn_save->trainer_info.p_name, trainer_name, 7);
    if (error != PKSAV_ERROR_NONE)
    {
        printf("Error getting trainer name: %d\n", error);
        return NULL;
    }
    return trainer_name;
}

EMSCRIPTEN_KEEPALIVE
char* get_trainer_id(struct pksav_gen1_save *pkmn_save)
{
    uint16_t trainer_id = pksav_bigendian16(*pkmn_save->trainer_info.p_id);
    static char trainer_id_str[6] = {"\0"};
    sprintf(trainer_id_str, "%05d", trainer_id);
    return trainer_id_str;
}

EMSCRIPTEN_KEEPALIVE
int get_party_count(struct pksav_gen1_save *pkmn_save)
{
    return pkmn_save->pokemon_storage.p_party->count;
}

EMSCRIPTEN_KEEPALIVE
void get_party_pc_index(struct pksav_gen1_save *pkmn_save, uint8_t index)
{
    uint8_t party_count = pkmn_save->pokemon_storage.p_party->count;
    if (index >= party_count)
    {
        printf("Index out of range\n");
        return;
    }
    struct pksav_gen1_pc_pokemon pkmn_pc = pkmn_save->pokemon_storage.p_party->party[index].pc_data;
}

EMSCRIPTEN_KEEPALIVE
int get_party_party_index(struct pksav_gen1_save *pkmn_save, uint8_t index, struct pksav_gen1_pokemon_party_data *pkmn_party)
{
    uint8_t party_count = pkmn_save->pokemon_storage.p_party->count;
    if (index >= party_count)
    {
        printf("Index out of range\n");
        return 1;
    }
    pkmn_party->level = pkmn_save->pokemon_storage.p_party->party[index].party_data.level;
    pkmn_party->atk = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.atk);
    pkmn_party->def = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.def);
    pkmn_party->spd = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.spd);
    pkmn_party->spcl = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.spcl);
    pkmn_party->max_hp = pksav_bigendian16(pkmn_save->pokemon_storage.p_party->party[index].party_data.max_hp);

    return 0;
}
