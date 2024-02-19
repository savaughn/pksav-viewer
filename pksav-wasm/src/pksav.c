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
    printf("Trainer name from C: %s\n", trainer_name);
    return trainer_name;
}