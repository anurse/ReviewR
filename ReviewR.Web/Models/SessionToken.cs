﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security;
using System.Security.Cryptography;
using System.Web;
using System.Web.Security;

namespace ReviewR.Web.Models
{
    public class SessionToken
    {
        private static RNGCryptoServiceProvider _random = new RNGCryptoServiceProvider();
        public const int CurrentVersion = 2;

        public int Version { get; private set; }
        public ReviewRPrincipal User { get; private set; }
        public DateTime Expires { get; set; }

        public SessionToken(ReviewRPrincipal user, DateTime expires): this(CurrentVersion, user, expires) { }
        public SessionToken(int version, ReviewRPrincipal user, DateTime expires)
        {
            Version = version;
            User = user;
            Expires = expires;
        }

        public byte[] EncodeToken()
        {
            // Generate a nonce
            byte[] nonce = new byte[20];
            _random.GetBytes(nonce);
            
            // Write the unencrypted token
            MemoryStream strm = new MemoryStream();
            BinaryWriter writer = new BinaryWriter(strm);
            writer.Write(Version);
            writer.Write(nonce); // Write the nonce
            writer.Write(User.Identity.UserId);
            writer.Write(User.Identity.Email);
            writer.Write(User.Identity.DisplayName);
            writer.Write(String.Join("|", User.Identity.Roles));
            writer.Write(Expires.Ticks);
            
            byte[] buf = strm.ToArray();
            writer.Dispose();
            return buf;
        }

        public static SessionToken FromEncodedToken(byte[] encoded)
        {
            // Read the token
            try
            {
                MemoryStream strm = new MemoryStream(encoded);
                BinaryReader reader = new BinaryReader(strm);
                int version = reader.ReadInt32();
                if (version != CurrentVersion)
                {
                    throw new NotSupportedException("Token version is not supported");
                }
                reader.ReadBytes(20); // Skip the nonce
                int userId = reader.ReadInt32();
                string email = reader.ReadString();
                string displayName = reader.ReadString();
                string[] roles = reader.ReadString().Split('|');
                DateTime expires = new DateTime(reader.ReadInt64());
                return new SessionToken(
                    new ReviewRPrincipal(
                        new ReviewRIdentity()
                        {
                            UserId = userId,
                            Email = email,
                            DisplayName = displayName,
                            Roles = new HashSet<string>(roles)
                        }), expires);
            }
            catch (NotSupportedException)
            {
                // Let the NSEx bubble up
                throw;
            }
            catch (Exception ex)
            {
                throw new InvalidDataException("Error deserializing token", ex);
            }
        }
    }
}