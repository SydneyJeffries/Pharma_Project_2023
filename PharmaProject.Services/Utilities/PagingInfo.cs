using PharmaProject.Services.Utilities.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmaProject.Services.Utilities
{
    public class PagingInfo 
    {
        public int Page { get; set; } = 0;
        public int Take { get; set; } = 10;

    }
}
