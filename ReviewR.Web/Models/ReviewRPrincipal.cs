﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
using ReviewR.Web.Models;
using ReviewR.Web.Models.Data;
using ReviewR.Web.Services;

namespace ReviewR.Web.Models
{
    public class ReviewRPrincipal : IPrincipal
    {
        public ReviewRIdentity Identity { get; private set; }
        IIdentity IPrincipal.Identity { get { return Identity; } }

        public ReviewRPrincipal(ReviewRIdentity id)
        {
            Identity = id;
        }

        public static ReviewRPrincipal FromUser(User u)
        {
            return new ReviewRPrincipal(ReviewRIdentity.FromUser(u));
        }

        public bool IsInRole(string role)
        {
            return Identity.Roles.Contains(role);
        }
    }

    public class ReviewRIdentity : IIdentity
    {
        private string _hash;
        private string _emailWhenHashGenerated;

        public int UserId { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string EmailHash
        {
            get
            {
                if (!String.Equals(_emailWhenHashGenerated, Email, StringComparison.Ordinal))
                {
                    _hash = Utils.GetGravatarHash(Email);
                    _emailWhenHashGenerated = Email;
                }
                return _hash;
            }
        }

        public HashSet<string> Roles { get; set; }

        public static ReviewRIdentity FromUser(User u)
        {
            return new ReviewRIdentity()
            {
                UserId = u.Id,
                DisplayName = u.DisplayName,
                Email = u.Email,
                Roles = u.Roles == null ? 
                    new HashSet<string>() : 
                    new HashSet<string>(u.Roles.Select(r => r.RoleName), StringComparer.OrdinalIgnoreCase)
            };
        }

        string IIdentity.AuthenticationType
        {
            get { return "ReviewR"; }
        }

        bool IIdentity.IsAuthenticated
        {
            get { return true; }
        }

        string IIdentity.Name
        {
            get { return Email; }
        }
    }
}