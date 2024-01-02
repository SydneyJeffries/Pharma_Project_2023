﻿
using PharmaProject.Services.Utilities.Interfaces;
using PharmaProject.Objects.Models;

namespace PharmaProject.Services.Interfaces
{
    public interface ILookupService
    {
        Task<List<Drug>> GetDrugList();
        Task<List<State>> GetStateList();

    }
}